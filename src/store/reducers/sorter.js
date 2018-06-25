import * as actionTypes from '../actions/actionTypes'

const initialState = {
  selectedRules: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SORTING_RULES_SUCCESS: {
      return {
        ...state,
        selectedRules: action.payload.sortingRules.map(rule => {
          return {...rule}
        })
      }
    }
    default:
      return state
  }
}

export default reducer