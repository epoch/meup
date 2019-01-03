require('./style.css')

import React from 'react'
import ReactDom from 'react-dom'
import { parseQs } from '../lib/queryString'
import App from './components/App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { REQUEST_MEETUPS, RECEIVE_MEETUPS, TO_HOME, TO_MEETUP_DETAILS, 
  TO_LOGIN, SAVE_SESSION, LOAD_DATA, toHome, toMeetupDetails, loadData, saveSession, fetchMeetups } from './actions'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red500 } from 'material-ui/styles/colors'
import reducer from './reducer'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const loggerMiddleware = createLogger()

const store = createStore(
  reducer, 
  process.env.NODE_ENV === 'development' ?
  applyMiddleware(thunkMiddleware, loggerMiddleware) :
  applyMiddleware(thunkMiddleware)
)
reduxLogic(store)

ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({ palette: { primary1Color: red500 } })}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
)



