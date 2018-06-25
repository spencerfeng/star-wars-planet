import React, { Component } from 'react'

class PlanetsFilterItem extends Component {
  state = {
    checked: null,
    selectedRule: null,
    value: null
  }

  rulesRef = React.createRef()
  valueRef = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.checked === null && prevState.selectedRule === null && prevState.value === null) {
      return {
        checked: nextProps.selected,
        selectedRule: nextProps.selectedRule === null ? Object.keys(nextProps.rules)[0] : nextProps.selectedRule,
        value: nextProps.value
      }
    }

    return prevState
    
  } 

  updateValue = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        value: this.valueRef.current.value
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
    this.setState(prevState => {
      return {
        ...prevState,
        selectedRule: this.rulesRef.current.value
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
        ...prevState,
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
            <label><input onChange={this.toggleCheckbox} type="checkbox" value="name" defaultChecked={this.props.selected} /><span className="text-white ml-1">Name</span></label>
          </div>
          <div className="px-4 py-3 bg-purple-lighter">
            <select onChange={this.updateSelectedRule} className="h6 mr-2" defaultValue={this.state.selectedRule} ref={this.rulesRef}>
              {Object.keys(this.props.rules).map(rule => {
                return (
                  <option key={rule} value={rule}>{this['props']['rules'][rule]}</option>
                )
              })}
            </select>
            <input onChange={this.updateValue} className="rounded p-1" type="text" defaultValue={this.props.value} ref={this.valueRef} />
          </div>
        </React.Fragment>
      )
    }
    if (this.props.column === 'terrain') {
      html = (
        <React.Fragment>
          <div className="px-4 py-3 border-b border-purple-lighter border-solid">
            <label><input onChange={this.toggleCheckbox} type="checkbox" value="name" defaultChecked={this.props.selected} /><span className="text-white ml-1">Terrain</span></label>
          </div>
          <div className="px-4 py-3 bg-purple-lighter">
            <select onChange={this.updateSelectedRule} className="h6 mr-2" defaultValue={this.state.selectedRule} ref={this.rulesRef}>
              {Object.keys(this.props.rules).map(rule => {
                return (
                  <option key={rule} value={rule}>{this['props']['rules'][rule]}</option>
                )
              })}
            </select>
            <input onChange={this.updateValue} className="rounded p-1" type="text" defaultValue={this.props.value} ref={this.valueRef} />
          </div>
        </React.Fragment>
      )
    }

    return html
  }
}

export default PlanetsFilterItem