import * as actionTypes from './actionTypes'

export const updateSortingRulesSuccess = sortingRules => {
  return {
    type: actionTypes.UPDATE_SORTING_RULES_SUCCESS,
    payload: {
      sortingRules
    }
  }
}