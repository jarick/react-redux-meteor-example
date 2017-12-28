// @flow

import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

if (Meteor.users.find({ username: 'admin' }).count() === 0) {
  Accounts.createUser({
    username: 'admin',
    email: 'admin@email.no',
    password: 'admin',
    profile: {
      first_name: 'fname',
      last_name: 'lname',
      company: 'company',
    },
  })
}
