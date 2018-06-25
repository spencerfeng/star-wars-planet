import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import sorterReducer from './store/reducers/sorter'
import planetReducer from './store/reducers/planet'
import filterReducer from './store/reducers/filter'
import planetDetailsModalReducer from './store/reducers/planetDetailsModal'
import residentReducer from './store/reducers/resident'
import registerServiceWorker from './registerServiceWorker'

const rootReducer = combineReducers({
  sorter: sorterReducer,
  planet: planetReducer,
  filter: filterReducer,
  planetDetailsModal: planetDetailsModalReducer,
  resident: residentReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
