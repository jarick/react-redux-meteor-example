// @flow

import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { loadPages, savePage } from '../../imports/constants/methods'
import { Pages } from '../../imports/types'
import { createListPublication } from '../../imports/core/publications'

Meteor.methods({
  [savePage](page) {
    check(page, {
      id: Match.OneOf(Mongo.ObjectID, null),
      tag: String,
      code: String,
      title: String,
      description: String,
      body: String,
      section: Number,
      external_id: Match.OneOf(Number, null),
      status: Number,
      date: Date,
    })
    const { id, ...save } = page

    return !id ? Pages.insert(save) : Pages.update(id, save)
  },
  [loadPages]: createListPublication(Pages),
})
