import * as actionTypes from './actionTypes'

export const showPlanetDetailsModal = planetName => {
  return {
    type: actionTypes.SHOW_PLANET_DETAILS_MODAL,
    payload: {
      planetName
    }
  }
}

export const hidePlanetDetailsModal = () => {
  return {
    type: actionTypes.HIDE_PLANET_DETAILS_MODAL
  }
}