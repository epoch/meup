var expect = require('chai').expect
import { toQs, parseQs } from '../lib/queryString'

describe('queryString', () => {
  it('converts object to query string', () => {
    const params = { 
      response_type: 'token',
      redirect_uri: 'http://localhost:8080' 
    } 

    const str = '?response_type=token&redirect_uri=http://localhost:8080'
    expect(toQs(params)).to.be.equal(str)
  })

  it('parse query string to object', () => {
    const params = { 
      response_type: 'token',
      redirect_uri: 'http://localhost:8080' 
    } 

    const str = '?response_type=token&redirect_uri=http://localhost:8080'
    expect(parseQs(str)).to.deep.equal(params)
  })
})