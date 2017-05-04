import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Meetups from './Meetups'
import MeetupDetails from './MeetupDetails'
import { filter, takeLast } from 'ramda'
import { parseQs } from '../../lib/queryString'
import { fetchMeetups, toHome, toMeetupDetails } from '../actions'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.show = this.show.bind(this);
    this.home = this.home.bind(this);
  }

  componentDidMount() {
    if (this.hasFragment()) {
      const resp = parseQs(window.location.hash)
      this.props.dispatch(fetchMeetups())
    }
  }

  hasFragment() {
    return location.hash.length > 0 
  }

  show(id) {
    this.props.dispatch(toMeetupDetails(id))
  }

  home() {
    this.props.dispatch(toHome())
  }

  renderPage() {
    if (!this.hasFragment()) return <Login />

    const { meetups, meetup, route } = this.props
    switch (route.view) {
      case 'home':
        return <Meetups meetups={meetups} onSelect={this.show} />
      case 'show':
        return <MeetupDetails meetup={meetup} onBack={this.home} />
      default:
        return <Login />
    }
  }

  render() {
    return <div>
      {this.renderPage()}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    meetups: state.meetups,
    meetup: state.meetup,
    route: state.route
  }
}

export default connect(mapStateToProps)(App)
