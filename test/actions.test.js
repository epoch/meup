var expect = require('chai').expect
import * as actions from '../app/actions'

describe('actions', () => {
  it('returns true when token expired', () => {
    const timeNow = new Date() / 1000
    const state = {
      session: {
        expiresAt: new Date() / 1000 - 60 // expired 60 seconds ago
      }
    }
    expect(actions.shouldRenewToken(state, timeNow)).to.be.true
  })
})