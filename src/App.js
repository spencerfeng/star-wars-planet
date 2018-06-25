import React, { Component } from 'react'
import './components/PlanetsListTable'
import PlanetsListTable from './components/PlanetsListTable'
import withPlanetDetailsModal from './HOC/withPlanetDetailsModal'

class App extends Component {
  render() {
    return (
      <div className="App font-sans bg-blue-lightest min-h-screen pb-2">
        <header className="bg-purple py-3">
          <h1 className="text-white text-base text-center">
            <div>starWarsPlanet</div>
            <i className="fa fa-globe fa-2x mr-1" aria-hidden="true"></i>
          </h1>
        </header>
          
        <div className="max-w-xl mx-auto px-4 py-50px">
          <PlanetsListTable />
        </div>

        <div className="text-center text-black text-xxs">&copy; Spencer Feng 2018</div>
      </div>
    );
  }
}

export default withPlanetDetailsModal(App)
