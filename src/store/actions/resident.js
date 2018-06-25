import * as actionTypes from './actionTypes'

export const loadResidentsSuccess = (planetName, residents) => {
  return {
    type: actionTypes.LOAD_RESIDENTS_SUCCESS,
    payload: {
      planetName,
      residents
    }
  }
}