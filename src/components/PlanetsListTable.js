import React, { Component } from 'react'
import * as Utils from '../utilities'
import PlanetsSorter from './PlanetsSorter'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import PlanetsFilter from './PlanetsFilter'
import SpinnerRectangleBounce from '../UI/SpinnerRectangleBounce'

class PlanetsListTable extends Component {
  componentDidMount() {
    new Promise((resolve, reject) => {
      Utils.getPlanets('https://swapi.co/api/planets', [], resolve, reject)
    })
      .then(response => {
        this.props.loadPlanetsSuccess(response)
      })
  }

  sortingPlanetsList() {
    const sortedPlanetsList = this.onApplyFilter().map(planet => {
      return {
        name: planet.name,
        population: planet.population === 'unknown' ? -1 : planet.population,
        populationForDisplay: planet.population,
        terrain: planet.terrain,
        url: planet.url
      }
    })

    const rules = this.props.sortingRules
    if (rules.length) {
      Utils.sortPlanetsByRules(sortedPlanetsList, rules)
    }
    
    return sortedPlanetsList
  }

  getSortableColHeaderCellHtml(columnName, displayName) {
    let html = (<th align="left" className="px-4 py-4">{displayName}</th>)
    const rules = this.props.sortingRules
    for (let i=0; i<rules.length; i++) {
      if (rules[i].column === columnName) {
        if (rules[i].direction === 'up') {
          html = (<th align="left" className="px-4 py-4">{displayName} <i className="fa fa-sort-asc" aria-hidden="true"></i></th>)
        }
        if (rules[i].direction === 'down') {
          html = (<th align="left" className="px-4 py-4">{displayName} <i className="fa fa-sort-desc" aria-hidden="true"></i></th>)
        }
        break
      }
    }
    return html
  }

  onApplyFilter = () => {
    if (this.props.filterRules.length) {
      const rules = this.props.filterRules
      let planets = this.props.planets
      for (let i=0; i<rules.length; i++) {
        planets = Utils.filterPlanetsByRules(planets, rules[i])
      }
      return planets
    } else {
      return this.props.planets
    }
  }

  render() {
    let planetsTable = (
      <div className="planets-table-loading-spinner-container w-full h-full flex items-center justify-center">
        <SpinnerRectangleBounce show={true} />
      </div>
    );

    if (this.props.planets !== null) {
      planetsTable = (
        <React.Fragment>
          <div className="flex justify-between items-center">
            <div><PlanetsSorter /></div>
            <div><PlanetsFilter applyFilter={this.onApplyFilter} /></div>
          </div>
          <div className="rounded overflow-hidden">
            <table width="100%" className="font-thin shadow border-grey-lighter border-2 border-solid bg-white">
              <thead className="bg-grey-lighter">
                <tr>
                  {this.getSortableColHeaderCellHtml('name', 'Name')}
                  {this.getSortableColHeaderCellHtml('population', 'Population')}
                  <th align="left" className="px-4 py-4">Terrain Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.sortingPlanetsList().map(planet => {
                  return (
                    <tr key={planet.url} className="border-grey-lighter border-b border-solid">
                      <td align="left" className="px-4 py-4">{planet.name}</td>
                      <td align="left" className="px-4 py-4">{planet.populationForDisplay}</td>
                      <td align="left" className="px-4 py-4">{planet.terrain}</td>
                      <td align="center">
                        <button onClick={() => this.props.showPlanetDetailsModal(planet.name)} className="btn uppercase text-white bg-purple text-xxs">LEARN MORE</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )
    }

    return planetsTable
  }
}

const mapStateToProps = state => {
  return {
    planets: state.planet.planets,
    sortingRules: state.sorter.selectedRules,
    filterRules: state.filter.selectedFilterRules
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPlanetsSuccess: planets => dispatch(actions.loadPlanetsSuccess(planets)),
    showPlanetDetailsModal: planetName => dispatch(actions.showPlanetDetailsModal(planetName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsListTable)