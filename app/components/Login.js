import React from 'react'
import { toQs, parseQs } from '../../lib/queryString'
import RaisedButton from 'material-ui/RaisedButton'

export default class Login extends React.Component {

  render() {
    const params = { 
      client_id: 'naq8hg8v8kr2gds5tqj3k63f3u',
      response_type: 'token',
      redirect_uri: process.env.REDIRECT_URI 
    } 

    const url = 'https://secure.meetup.com/oauth2/authorize' + toQs(params)

    const style = {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return <div style={style}>
      <RaisedButton label="Login with Meetup" primary={true} href={url} />
    </div>
  }

}