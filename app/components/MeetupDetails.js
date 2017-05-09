import React from 'react'
import { List, ListItem } from 'material-ui/List'
import ActionEvent from 'material-ui/svg-icons/action/event'
import CommunicationLocationOn from 'material-ui/svg-icons/communication/location-on'
import CommunicationForum from 'material-ui/svg-icons/communication/forum'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import CardText from 'material-ui/Card/CardText'
import CardTitle from 'material-ui/Card/CardTitle'
import moment from 'moment'
import './MeetupDetails.css'

const MeetupDetails = ({meetup, onBack}) => {
  return <div>
    <AppBar
      title={moment(meetup.time).fromNow()}
      iconElementLeft={<IconButton><NavigationClose onTouchTap={onBack} /></IconButton>} />
    <Divider />
    <List>
      <ListItem leftIcon={<ActionEvent />} 
        primaryText={moment(meetup.time).format('llll')} />
      <ListItem leftIcon={<CommunicationLocationOn />} 
        primaryText={meetup.venue ? meetup.venue.name : '?'} 
        secondaryText={meetup.venue && meetup.venue.address_1} />
      <ListItem leftIcon={<CommunicationForum />} 
        primaryText={meetup.name} 
        secondaryText={meetup.group.name}/>
    </List>
    <CardTitle>{meetup.yes_rsvp_count} people are going</CardTitle>
    <CardText className="card-text" dangerouslySetInnerHTML={{ __html: meetup.description }}></CardText>
  </div>
}

export default MeetupDetails


