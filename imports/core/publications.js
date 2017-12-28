// @flow

import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import escapeRegExp from '../../imports/utils/escapeRegExp'


export const createListPublication = (
  List: Mongo.Collection,
  auth: (userId?: string) => boolean = () => true,
  createCustomFilter: (filter: Object) => Object = () => {},
) => {
  return function(
    page: number = 1,
    size: number = 20,
    search: Object = {},
    sort: Object = {},
    filter: Object = {},
  ): { count: number, items: Object[] } {
    if (!auth(this.userId)) {
      throw new Meteor.Error('Access denied')
    }
    check(page, Number)
    check(size, Number)
    check(search, Object)
    check(sort, Object)
    check(filter, Object)
    const skip = (page - 1) * size
    const find = {
      ...Object.keys(filter)
        .reduce((result: Object, key: string): Object => {
          return key.length > 0 && typeof search[key] !== 'object' && !key.startsWith('$')
            ? {
              ...result,
              [key]: filter[key],
            }
            : result
        }, {}),
      ...createCustomFilter(filter),
    }
    Object.keys(search).forEach((key: string) => {
      if (key.length > 0 && typeof search[key] === 'string' && search[key].length > 0) {
        find[key] = { $regex: escapeRegExp(search[key]) }
      }
    })
    const count = List.find(find).count()
    const items = List.find(find, { skip, limit: Math.min(100, size), sort }).fetch()

    return { count, items }
  }
}
