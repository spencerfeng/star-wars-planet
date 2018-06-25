import React, { Component } from 'react'
import * as Utils from '../utilities'

class PlanetsSorterRuleItem extends Component {
  onDeleteRule = (e, name, order) => {
    e.preventDefault()
    this.props.deleteRule(name, order)
  }

  onChangeOption = (e, order) => {
    this.props.changeOption(e.target.value, order)
  }

  render() {
    const sortableCols = Object.keys(this.props.allRules)
    const sortedCols = this.props.sortedCols

    // Get the options that can be used in the dropdown list
    const availableRules = []
    for (let col in this.props.allRules) {
      // If this is the only sorted column, then we can choose to sort any of the columns
      if (sortedCols.length === 1) {
        for (let direction in this['props']['allRules'][col]) {
          availableRules.push({
            name: this['props']['allRules'][col][direction]['name'],
            text: this['props']['allRules'][col][direction]['text']
          })
        }
      }
      // If there are more than one sorted columns, then we can only sort un-sorted columns
      else {
        // Get the current column that is been sorted plus all sortable columns that have not been sorted
        if (this.props.column === col) {
          for (let direction in this['props']['allRules'][col]) {
            availableRules.push({
              name: this['props']['allRules'][col][direction]['name'],
              text: this['props']['allRules'][col][direction]['text']
            })
          }
        } else {
          const sortableColsYetToBeSorted = Utils.arrayDiff(sortableCols, sortedCols)
          
          if (sortableColsYetToBeSorted.indexOf(col) >= 0) {
            for (let direction in this['props']['allRules'][col]) {
              availableRules.push({
                name: this['props']['allRules'][col][direction]['name'],
                text: this['props']['allRules'][col][direction]['text']
              })
            }
          }
        }
      }
    }

    let labelText = this.props.order === 0 ? 'SORT BY :' : 'THEN BY :'

    return (
      <div className="mb-5">
        <label className="mr-2 bold text-white">{labelText}</label>
        <select onChange={(e) => this.onChangeOption(e, this.props.order)} className="mr-2 h-6 w-170px" defaultValue={this.props.name}>
          {availableRules.map(rule => {
            return (
              <option key={rule.name} value={rule.name}>{rule.text}</option>
            )
          })
          }
        </select>
        <button onClick={e => this.onDeleteRule(e, this.props.name, this.props.order)} className="text-white border-white border-solid border text-xs px-2 py-1 rounded">DELETE</button>
      </div>      
    )
  }
}

export default PlanetsSorterRuleItem