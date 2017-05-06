import axios from 'axios'
import { parseQs } from '../lib/queryString'

export const REQUEST_MEETUPS = 'REQUEST_MEETUPS'
export const RECEIVE_MEETUPS = 'RECEIVE_MEETUPS'
export const TO_MEETUP_DETAILS = 'TO_MEETUP_DETAILS'
export const TO_HOME = 'TO_HOME'
export const TO_LOGIN = 'TO_LOGIN'
export const SAVE_SESSION = 'SAVE_SESSION'
export const LOAD_DATA = 'LOAD_DATA'

export function loadData() {
  return { type: LOAD_DATA }
}

export function saveSession(resp) {
  console.info('save session', resp)
  return {
    type: SAVE_SESSION,
    oauthResponse: resp
  }
}

function shouldRenewToken(state) {
  const timeNow = new Date() / 1000 // in seconds
  console.info('token will expire in', (state.session.expiresAt - timeNow) / 60, 'minutes')
  return timeNow > state.expiresAt ? true : false
}

export function toLogin() {
  return { type: TO_LOGIN }
}

export function toMeetupDetails(id) {
  return {
    type: TO_MEETUP_DETAILS,
    id: id
  }
}

export function toHome() {
  return {
    type: TO_HOME
  }
}

export function requestMeetups() {
  return { type: REQUEST_MEETUPS }
}

export function receivedMeetups(json) {
  return { 
    type: RECEIVE_MEETUPS,
    meetups: json 
  }
}

export function fetchMeetups(token) {
  
  return (dispatch, getState) => {
    if (shouldRenewToken(getState())) {
      console.info('need to renew token')
      dispatch(toLogin())
    } else {
      console.info('token still good')
      dispatch(requestMeetups())
      dispatch(toHome())

      const config = {
        url: 'https://api.meetup.com/self/events',
        params: {
          page: 20,
          status: 'upcoming',
          access_token: token
        }
      }
      return axios(config)
        .catch(err => {
          // window.location = ''
        })
        .then(res => {
          return dispatch(receivedMeetups(res.data))
        })
    }

  }
}
