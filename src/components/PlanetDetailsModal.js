import React, { Component } from 'react'
import { connect } from 'react-redux'
import Backdrop from '../UI/Backdrop'
import * as actions from '../store/actions/index'
import axios from 'axios'
import SpinnerRectangleBounce from '../UI/SpinnerRectangleBounce'
import * as Utils from '../utilities'

class PlanetDetailsModal extends Component {
  state = {
    planetName: null,
    planet: null
  }

  componentDidUpdate() {
    if (this.props.show) {
      if (this.state.planetName !== this.props.planetName) {
        const planetName = this.props.planetName
        const planet = this.props.planets === null
                                                ? null
                                                : this.props.planets.find(p => p.name === planetName)
        
        if (planet) {
          this.setState({
            planetName: planetName,
            planet: {
              ...planet,
              residents: [...planet.residents],
              films: [...planet.films]
            }
          }, () => {
            const residents = this.state.planet.residents
            if (residents.length) {
              const getResidentsPromisesArr = residents.map(resident => {
                return this.getResident(resident)
              }) 

              // We only retrieve residents from the server if we have not done it before
              if (!this.hasCachedResidents()) {
                Promise.all(getResidentsPromisesArr)
                .then(allResponses => {
                  const residents = []
                  allResponses.forEach(r => {
                    residents.push(r.data.name)
                  })
                  this.props.loadResidentsSuccess(this.state.planetName, residents)
                })
                .catch(error => {
                  console.log(error)
                })
              }
            }
          })
        }
      }
    }
  }

  getResident(url) {
    return axios.get(url)
  }

  hasCachedResidents() {
    const cachedResidents = this.props.allResidents.find(r => {
      return r.planet === this.state.planetName
    })

    if (cachedResidents === undefined) {
      return false
    }

    return cachedResidents.residents
  }

  render() {
    let residentsRow = null
    // Only need the residents row if the planet has residents
    if (this.state.planet && this.state.planet.residents.length) {
      residentsRow = (
        <tr>
          <td className="px-4 py-4" colSpan="2" align="center">
            <SpinnerRectangleBounce show={true} color="white" size="small" />
          </td>
        </tr>
      )
      if (this.hasCachedResidents()) {
        residentsRow = (
          <tr>
            <td className="px-4 py-4" valign="top">RESIDENTS</td>
            <td className="px-4 py-4" valign="top">
              {this.hasCachedResidents().map(r => {
                return (
                  <div key={r} className="mb-2"><i className="fa fa-user mr-2" aria-hidden="true"></i>{r}</div>
                )
              })}
            </td>
          </tr>
        )
      }
    }

    let planetDetailsTable = null
    if (this.props.show && this.state.planet) {
      planetDetailsTable = (
        <div className="h-full overflow-y-scroll">
          <table width="100%" className="font-thin text-sm">
            <thead>
              <tr>
                <th className="px-4 py-4" colSpan="2" align="center"><i className="fa fa-globe mr-2" aria-hidden="true"></i> <span className="text-lg">{this.state.planetName}</span></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.planet).filter(k => {
                if (k === 'name' || k === 'residents' || k === 'films') {
                  return false
                }
                return true
                })
                  .map((k, index) => {
                    return (
                      <tr key={k} className="border-b border-solid border-purple-light">
                        <td className="px-4 py-4">{Utils.snakeCaseToUpperCaseTitle(k)}</td>
                        <td className="px-4 py-4">{this['state']['planet'][k]}</td>
                      </tr>
                    )
                  })}
                  {residentsRow}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <React.Fragment>
        <Backdrop show={this.props.show} />
        <div className="planet-details-container px-8 py-8 fixed bg-purple z-50 rounded shadow-lg text-white font-sans"
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          <span onClick={this.props.closeModal} className="modal-close-btn">&times;</span>
          {planetDetailsTable}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    planets: state.planet.planets,
    show: state.planetDetailsModal.showPlanetDetailsModal,
    allResidents: state.resident.allResidents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.hidePlanetDetailsModal()),
    loadResidentsSuccess: (planetName, residents) => dispatch(actions.loadResidentsSuccess(planetName, residents))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetailsModal)