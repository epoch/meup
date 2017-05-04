import axios from 'axios'
import { parseQs } from '../lib/queryString'
// import { fetchMeetups as fakeFetch } from '../lib/meetupApi'

export const REQUEST_MEETUPS = 'REQUEST_MEETUPS'
export const RECEIVE_MEETUPS = 'RECEIVE_MEETUPS'
export const TO_MEETUP_DETAILS = 'TO_MEETUP_DETAILS'
export const TO_HOME = 'TO_HOME'

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

export function fetchMeetups() {
  return dispatch => {
    dispatch(requestMeetups())

    const resp = parseQs(window.location.hash)
    const config = {
      url: 'https://api.meetup.com/self/events',
      params: {
        page: 20,
        status: 'upcoming',
        access_token: resp.access_token
      }
    }
    return axios(config)
      .catch(err => {
        window.location = ''
      })
      .then(res => {
        return dispatch(receivedMeetups(res.data))
      })
  }
}
