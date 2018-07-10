import React, { Component } from 'react'

class PlanetsFilterItem extends Component {
  state = {
    initialSyncTempSelFilterInfoDone: false,
    checked: false,
    selectedRule: '',
    value: ''
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.initialSyncTempSelFilterInfoDone) {
      return {
        checked: nextProps.selected,
        selectedRule: nextProps.selectedRule,
        value: nextProps.value,
        initialSyncTempSelFilterInfoDone: true
      }
    }

    if (nextProps.reset) {
      return {
        checked: nextProps.selected,
        selectedRule: nextProps.selectedRule,
        value: nextProps.value
      }
    }

    return null
    
  }

  componentDidUpdate() {
    // We need to set the 'clearFilters' state in the parent component to false
    if (this.props.reset) {
      this.props.resetClearFiltersState()
    }
  }

  updateValue = e => {
    const newValue = e.target.value

    this.setState(prevState => {
      return {
        value: newValue
      }
    }, () => {
      if (this.state.checked === false) {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 1)
      } else {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 0)
      }
    })
  }

  updateSelectedRule = e => {
    const newRule = e.target.value

    this.setState(prevState => {
      return {
        selectedRule: newRule
      }
    }, () => {
      if (this.state.checked === false) {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 1)
      } else {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 0)
      }
    })
  }

  toggleCheckbox = () => {
    this.setState(prevState => {
      return {
        checked: !prevState.checked
      }
    }, () => {
      if (this.state.checked === false) {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 1)
      } else {
        this.props.updateTempSelectedFilters(this.props.column, this.state.selectedRule, this.state.value, 0)
      }
    })
  }

  render() {
    let html = null

    if (this.props.column === 'name') {
      html = (
        <React.Fragment>
          <div className="px-4 py-3 border-b border-purple-lighter border-solid">
            <label><input onChange={this.toggleCheckbox} type="checkbox" checked={this.state.checked} /><span className="text-white ml-1">Name</span></label>
          </div>
          <div className="px-4 py-3 bg-purple-lighter">
            <select onChange={this.updateSelectedRule} className="h6 mr-2" value={this.state.selectedRule}>
              {Object.keys(this.props.rules).map(rule => {
                return (
                  <option key={rule} value={rule}>{this['props']['rules'][rule]}</option>
                )
              })}
            </select>
            <input onChange={this.updateValue} className="rounded p-1" type="text" value={this.state.value} />
          </div>
        </React.Fragment>
      )
    }
    if (this.props.column === 'terrain') {
      html = (
        <React.Fragment>
          <div className="px-4 py-3 border-b border-purple-lighter border-solid">
            <label><input onChange={this.toggleCheckbox} type="checkbox" checked={this.state.checked} /><span className="text-white ml-1">Terrain</span></label>
          </div>
          <div className="px-4 py-3 bg-purple-lighter">
            <select onChange={this.updateSelectedRule} className="h6 mr-2" value={this.state.selectedRule}>
              {Object.keys(this.props.rules).map(rule => {
                return (
                  <option key={rule} value={rule}>{this['props']['rules'][rule]}</option>
                )
              })}
            </select>
            <input onChange={this.updateValue} className="rounded p-1" type="text" value={this.state.value} />
          </div>
        </React.Fragment>
      )
    }

    return html
  }
}

export default PlanetsFilterItem