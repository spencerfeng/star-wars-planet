import React, { Component } from 'react'
import PlanetsSorterRuleItem from './PlanetsSorterRuleItem'
import * as Utils from '../utilities'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

class PlanetsSorter extends Component {
  state = {
    allRules: { 
      name: {
        up: {
          name: 'nameUp',
          text: 'Name (alpha up)',
          direction: 'up',
          type: 'string'
        },
        down: {
          name: 'nameDown',
          text: 'Name (alpha down)',
          direction: 'down',
          type: 'string'
        }
      },
      population: {
        up: {
          name: 'populationUp',
          text: 'Population (numeric up)',
          direction: 'up',
          type: 'number'
        },
        down: {
          name: 'populationDown',
          text: 'Population (numeric down)',
          direction: 'down',
          type: 'number'
        }
      }
    },
    tempSelectedRules: [],
    initialSyncedTempSelRulesWithGlobalPreDefinedSelRules: false,
    open: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.initialSyncedTempSelRulesWithGlobalPreDefinedSelRules === false) {
      return {
        tempSelectedRules: nextProps.selectedRules.map(rule => {
          return {...rule}
        }),
        initialSyncedTempSelRulesWithGlobalPreDefinedSelRules: true
      }
    }

    return null
  }

  getTempSortedColumns() {
    return this.state.tempSelectedRules.reduce((accumulator, rule) => {
      if (accumulator.indexOf(rule.column) < 0) {
        accumulator.push(rule.column)
      }

      return accumulator
    }, [])
  }

  onAddRule = () => {
    const sortedCols = this.getTempSortedColumns()
    const sortableCols = Object.keys(this.state.allRules)

    // Get sortable columns which have not been sorted
    const sortableColsYetToBeSorted = Utils.arrayDiff(sortableCols, sortedCols)

    this.setState(prevState => {
      // Deep clone 'tempSelectedRules' state
      const clonedTempSelectedRules = prevState.tempSelectedRules.map(rule => {
        return {...rule}
      })

      return {
        tempSelectedRules: [
          ...clonedTempSelectedRules,
          {
            name: prevState['allRules'][sortableColsYetToBeSorted[0]]['up']['name'],
            column: sortableColsYetToBeSorted[0],
            direction: prevState['allRules'][sortableColsYetToBeSorted[0]]['up']['direction'],
            type: prevState['allRules'][sortableColsYetToBeSorted[0]]['up']['type']
          }
        ]
      }
    }, () => {
      // console.log(this.state)
    })
  }

  onDeleteRule = order => {
    // Update the 'tempSelectedRules' state
    this.setState(prevState => {
      // Deep clone 'tempSelectedRules' state
      const clonedTempSelectedRules = prevState.tempSelectedRules.map(rule => {
        return {...rule}
      })
      // Remove the deleted rule from the state
      clonedTempSelectedRules.splice(order, 1)

      return {
        tempSelectedRules: clonedTempSelectedRules
      }
    }, () => {
      console.log(this.state)
    })
  }

  onCancel = () => {
    this.toggleSort()
  }

  onChangeOption = (ruleName, order) => {
    const rule = {}

    // Get the column and direction information for this rule
    for (let col in this.state.allRules) {
      for (let direction in this['state']['allRules'][col]) {
        if (this['state']['allRules'][col][direction]['name'] === ruleName) {
          rule.name = ruleName
          rule.column = col
          rule.direction = this['state']['allRules'][col][direction]['direction']
          rule.type = this['state']['allRules'][col][direction]['type']
        }
      }
    }

    // Update the 'tempSelectedRules' state
    this.setState(prevState => {
      // Deep clone 'tempSelectedRules' state
      const clonedTempSelectedRules = prevState.tempSelectedRules.map(rule => {
        return {...rule}
      })
      // Update the rule from with that order the state
      clonedTempSelectedRules.splice(order, 1, rule)

      return {
        tempSelectedRules: clonedTempSelectedRules
      }
    }, () => {
      console.log(this.state)
    })
  }

  onApplySorting = () => {
    // Update Redux store
    this.props.updateSortingRule(this.state.tempSelectedRules)

    // Hide the sort window
    this.setState(prevState => {
      return {
        open: false
      }
    })
  }

  toggleSort = () => {
    this.setState(prevState => {
      if (prevState.open) {
        return {
          open: !prevState.open,
          tempSelectedRules: this.props.selectedRules.map(rule => {
            return {...rule}
          })
        }
      } else {
        return {
          open: !prevState.open
        }
      }
    })
  }

  render() {
    const sortedCols = this.getTempSortedColumns()
    const sortableCols = Object.keys(this.state.allRules)

    return (
      <div className="mb-2 text-xs">
        <div className="overflow-visible rounded mb-px relative">
          <button onClick={this.toggleSort} className="btn uppercase text-white bg-purple">
            <i className="fa fa-sort mr-1" aria-hidden="true"></i>
            <span>Sort</span>
          </button>
          {this.state.open && (
            <div className="bg-purple px-4 py-4 rounded inline-block w-340px absolute pin-l btn-fly-out shadow-lg">
              <form>
                {this.state.tempSelectedRules.map((rule, index) => {
                  return <PlanetsSorterRuleItem 
                            name={rule.name} 
                            order={index} 
                            column={rule.column}
                            key={rule.name} 
                            sortedCols={this.getTempSortedColumns()}
                            allRules={this.state.allRules}
                            addRule={this.onAddRule}
                            deleteRule={this.onDeleteRule}
                            changeOption={this.onChangeOption} />
                })}
              </form>
              {(sortableCols.length > sortedCols.length) && (
                <div className="text-center">
                  <button onClick={this.onAddRule} className="text-white border-white border-solid border text-xs px-2 py-1 mr-1 rounded">ADD RULE</button>
                </div>
              )}
              <div className="text-center border-solid border-t border-purple-lighter mt-4 pt-4">
                <button onClick={this.onCancel} className="text-white border-white border-solid border text-xs px-2 py-1 mr-1 rounded">CANCEL</button>
                <button onClick={this.onApplySorting} className="text-white border-white border-solid border text-xs px-2 py-1 ml-1 rounded">APPLY</button>
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
    selectedRules: state.sorter.selectedRules
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSortingRule: sortingRules => dispatch(actions.updateSortingRulesSuccess(sortingRules))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsSorter)