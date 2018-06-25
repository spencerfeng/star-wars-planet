import * as actionTypes from '../actions/actionTypes'

const initialState = {
  selectedFilterRules: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FILTER_RULES_SUCCESS: {
      return {
        ...state,
        selectedFilterRules: action.payload.selectedFilterRules.map(rule => {
          return {...rule}
        })
      }
    }
    default:
      return state
  }
}

export default reducer