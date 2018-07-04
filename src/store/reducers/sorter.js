import * as actionTypes from '../actions/actionTypes'

const initialState = {
  /**
   * selectedRule will look like:
   * 
   * [
   *    {
   *      name: "populationUp",
   *      column: "population",
   *      direction: "up",
   *      type: "number"
   *    },
   *    {
   *      name: "nameUp",
   *      column: "name",
   *      direction: "up",
   *      type: "string"
   *    }
   * ]
   * 
   */
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