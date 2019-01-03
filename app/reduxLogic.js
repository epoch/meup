import { REQUEST_MEETUPS, RECEIVE_MEETUPS, TO_HOME, TO_MEETUP_DETAILS,
    TO_LOGIN, SAVE_SESSION, LOAD_DATA, toHome, toMeetupDetails, loadData, saveSession, fetchMeetups } from './actions'
import { parseQs } from '../lib/queryString'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

export const reduxLogic  = (store) => {
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
}
