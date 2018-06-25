import * as actionTypes from '../actions/actionTypes'

const initialState = {
  allResidents: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESIDENTS_SUCCESS: {
      const clonedAllResidents = state.allResidents.map(r => {
        return {
          ...r,
          residents: [...r.residents]
        }
      })
      return {
        allResidents: [
          ...clonedAllResidents,
          {
            planet: action.payload.planetName,
            residents: action.payload.residents
          }
        ]
      }
    }
    default:
      return state
  }
}

export default reducer