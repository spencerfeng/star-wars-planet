import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlanetDetailsModal from '../components/PlanetDetailsModal'
import { compose } from 'redux'

const withPlanetDetailsModal = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} />
          <PlanetDetailsModal show={this.props.show} planetName={this.props.planetName} />
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    show: state.planetDetailsModal.showPlanetDetailsModal,
    planetName: state.planetDetailsModal.planetName
  }
}

const composedHoc = compose(
  connect(mapStateToProps),
  withPlanetDetailsModal
)

export default composedHoc
