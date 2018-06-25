import * as actionTypes from './actionTypes'

export const loadPlanetsSuccess = planets => {
  return {
    type: actionTypes.LOAD_PLANETS_SUCCESS,
    payload: {
      planets
    }
  }
}