require('./style.css')

import { filter, find, propEq } from 'ramda'
import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { REQUEST_MEETUPS, RECEIVE_MEETUPS, TO_HOME, TO_MEETUP_DETAILS } from './actions'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red500 } from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const loggerMiddleware = createLogger()

const initState = {
  route: {
    view: 'home',
    id: ''
  },
  meetup: {},
  meetups: [],
  isFetching: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
  case TO_HOME:
    return Object.assign({}, state, { 
      route: { view: 'home' } 
    })
  case TO_MEETUP_DETAILS:
    return Object.assign({}, state, {
      route: { 
        view: 'show', 
        id: action.id 
      },
      meetup: find(propEq('id', action.id), state.meetups)
    })
  case REQUEST_MEETUPS:
    return Object.assign({}, state, { isFetching: true })
  case RECEIVE_MEETUPS:
    return Object.assign({}, state, { 
      isFetching: false , 
      meetups: action.meetups 
    })
  default: 
    return state
  }
}

const store = createStore(
  reducer, 
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({ palette: { primary1Color: red500 } })}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
)



