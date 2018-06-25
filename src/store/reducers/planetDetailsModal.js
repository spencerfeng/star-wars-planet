import * as actionTypes from '../actions/actionTypes'

const initialState = {
  showPlanetDetailsModal: false,
  planetName: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_PLANET_DETAILS_MODAL: {
      return {
        planetName: action.payload.planetName,
        showPlanetDetailsModal: true
      }
    }
    case actionTypes.HIDE_PLANET_DETAILS_MODAL: {
      return {
        planetName: null,
        showPlanetDetailsModal: false
      }
    }
    default:
      return state
  }
}

export default reducer