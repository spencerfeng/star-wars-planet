import * as actionTypes from '../actions/actionTypes'

const initialState = {
  planets: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PLANETS_SUCCESS: {
      return {
        ...state,
        planets: action.payload.planets.map(planet => {
          return {
            ...planet,
            residents: [...planet.residents],
            films: [...planet.films]
          }
        })
      }
    }
    default:
      return state
  }
}

export default reducer