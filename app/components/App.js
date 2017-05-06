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
  }

  show(id) {
    this.props.dispatch(toMeetupDetails(id))
  }

  home() {
    this.props.dispatch(toHome())
  }

  renderPage() {
    const { meetups, meetup, route, isFetching } = this.props
    switch (route.view) {
      case 'home':
        return <Meetups meetups={meetups} onSelect={this.show} isFetching={isFetching} />
      case 'show':
        return <MeetupDetails meetup={meetup} onBack={this.home} />
      case 'login':
        return <Login />
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
  console.info(state)
  return {
    meetups: state.meetups,
    meetup: state.meetup,
    route: state.route,
    session: state.session,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(App)
