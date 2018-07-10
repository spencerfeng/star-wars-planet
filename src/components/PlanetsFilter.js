import React, { Component } from 'react'
import PlanetsFilterItem from './PlanetsFilterItem'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

class PlanetsFilter extends Component {
  state = {
    open: false,
    filters: {
      name: {
        rules: {
          beginsWith: 'begins with',
          contains: 'contains',
          equalTo: 'is equal to'
        }
      },
      terrain: {
        rules: {
          beginsWith: 'begins with',
          contains: 'contains',
          equalTo: 'is equal to'
        }
      }
    },
    /**
     * the 'tempSelectedFilters' state will have the following shape:
     * 
     * [
     *    {
     *      column: 'terrain',
     *      rule: 'beginsWith',
     *      value: 'ac'
     *    },
     *    {
     *      column: 'name',
     *      rule: 'beginsWith',
     *      value: 'ab'
     *    }
     * ]
     */
    tempSelectedFilters: []
  }

  applyFilter = () => {
    // Update the global 'selectedFilterRules' state
    this.props.updateFilterRules(this.state.tempSelectedFilters)

    this.props.applyFilter()
  }

  toggleFilter = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      }
    })
  }

  onUpdateTempSelectedFilters = (column, selectedRule, value, deleteFlag) => {
    const filter = this.state.tempSelectedFilters.find(f => {
      return f.column === column
    })
    
    // Update
    if (deleteFlag === 0) {
      // New rule
      if (filter === undefined) {
        this.setState(prevState => {
          const clonedTempSelectedFilters = prevState.tempSelectedFilters.map(f => {
            return {...f}
          })

          return {
            tempSelectedFilters: [
              ...clonedTempSelectedFilters,
              {
                column: column,
                rule: selectedRule,
                value: value
              }
            ]
          }
        })
      }
      // Old rule
      else {
        this.setState(prevState => {
          const clonedAndUpdatedTempSelectedFilters = prevState.tempSelectedFilters.map(f => {
            if (f.column === column) {
              return {
                ...f,
                rule: selectedRule,
                value: value
              }
            }
            return {...f}
          })

          return {
            tempSelectedFilters: clonedAndUpdatedTempSelectedFilters
          }
        })
      }
    }

    // Delete
    if (deleteFlag === 1) {
      if (filter !== undefined) {
        this.setState(prevState => {
          const clonedAndUpdatedTempSelectedFilters = prevState.tempSelectedFilters.filter(f => {
            return f.column !== column
          })

          return {
            tempSelectedFilters: clonedAndUpdatedTempSelectedFilters
          }
        })
      }
    }
  }

  render() {
    return (
      <div className="mb-2 text-xs">
        <div className="overflow-visible rounded mb-px relative">
          <button onClick={this.toggleFilter} className="btn uppercase text-white bg-purple">
            <i className="fa fa-filter mr-1" aria-hidden="true"></i>
            <span>FILTER</span>
            {this.props.filterRules.length > 0 && (
              <span className="ml-1 text-purple-lighter">| {this.props.filterRules.length}</span>
            )}
          </button>
          {this.state.open && (
            <div className="bg-purple rounded inline-block w-340px absolute pin-r btn-fly-out shadow-lg">
              <form>
                {Object.keys(this.state.filters).map(filter => {
                  const selectedFilter = this.state.tempSelectedFilters.find(f => {
                    return f.column === filter
                  })
                  const selected = selectedFilter === undefined ? false : true
                  const selectedRule = selectedFilter === undefined ? Object.keys(this['state']['filters'][filter]['rules'])[0] : selectedFilter.rule
                  const value = selectedFilter === undefined ? '' : selectedFilter.value
    
                  return (
                    <PlanetsFilterItem 
                      column={filter}
                      rules={this['state']['filters'][filter]['rules']}
                      selected={selected}
                      selectedRule={selectedRule}
                      value={value}
                      key={filter}
                      updateTempSelectedFilters={this.onUpdateTempSelectedFilters} />
                  )
                })}
              </form>
              <div className="px-4 py-3 text-center">
                <button onClick={this.applyFilter} className="text-white border-white border-solid border text-xs px-2 py-1 rounded">APPLY</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filterRules: state.filter.selectedFilterRules
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFilterRules: selectedFilterRules => dispatch(actions.updateFilterRulesSuccess(selectedFilterRules))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsFilter)