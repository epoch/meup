import React from 'react'
import { qs, parseQs } from '../../lib/queryString'
import RaisedButton from 'material-ui/RaisedButton'

export default class Login extends React.Component {

  render() {
    const params = { 
      client_id: 'naq8hg8v8kr2gds5tqj3k63f3u',
      response_type: 'token',
      redirect_uri: 'http://localhost:8080' 
    } 

    const url = 'https://secure.meetup.com/oauth2/authorize' + qs(params)

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