import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import moment from 'moment'

const Meetups = ({ meetups, onSelect }) => {

  return <div>
    <List>
      <Subheader>Upcoming</Subheader>
      {meetups.map((meetup, index) => {
        return <ListItem
          primaryText={meetup.name}
          secondaryText={moment(meetup.time).fromNow()} 
          secondaryTextLines={2}
          onTouchTap={() => onSelect(meetup.id)}
          key={index} />
      })}
    </List>
  </div>

}

export default Meetups


