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

function handleHashRouting(event) {
  try {
    var [, path] = window.location.href.match(/#(.*)$/)
    var [page, id] = path.split('/')
    switch (page) {
    case 'home':
      return store.dispatch(toHome())
    case 'show':
      return store.dispatch(toMeetupDetails(id))
    }
  } catch(e) {
    console.log(e)
  }
}

window.addEventListener('hashchange', handleHashRouting)

const sessionExpiresAt = sessionStorage.getItem('sessionExpiresAt')
const sessionAccessToken = sessionStorage.getItem('sessionAccessToken')

if (sessionAccessToken && sessionExpiresAt) {
  console.info('returning visitor - load data')

  store.dispatch(loadData())
  store.dispatch(fetchMeetups(sessionAccessToken))

} else { 
  console.info('first time visitor')

  if (window.location.hash.length > 0) {
    console.info('redirect back from meetup &b have fragment')
    const oauthResponse = parseQs(window.location.hash)

    // save data
    console.info('save to session storage and state')
    store.dispatch(saveSession(oauthResponse))
    store.dispatch(fetchMeetups(oauthResponse.access_token))
  }
}

ReactDom.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({ palette: { primary1Color: red500 } })}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
)



