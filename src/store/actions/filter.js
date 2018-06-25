import * as actionTypes from './actionTypes'

export const updateFilterRulesSuccess = selectedFilterRules => {
  return {
    type: actionTypes.UPDATE_FILTER_RULES_SUCCESS,
    payload: {
      selectedFilterRules
    }
  }
}