// @flow

import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { setDataSetAction, type SetDataSetAction } from 'redux-dataset'
import { type Dispatch } from 'redux'
import escapeRegExp from '../utils/escapeRegExp'


export type LoadListPayload = {
  Collection: Mongo.Collection,
  data: string,
  counter: string,
  page?: number,
  size?: number,
  search?: { [field: string]: string },
  sort?: { [field: string]: 1 | -1 },
  filter?: Object
}

export const loadListAction = (props: LoadListPayload) => {
  const {
    Collection, data, page = 1, size = 20, search = {}, sort = {}, filter = {},
  } = props
  return (dispatch: Dispatch<SetDataSetAction<*>>) => {
    const skip = Meteor.isClient ? 0 : (page - 1) * size
    const find: Object = { ...filter }
    if (Meteor.isServer) {
      Object.keys(search).forEach((key: string) => {
        if (key.length > 0) {
          find[key] = { $regex: escapeRegExp(search[key]) }
        }
      })
    }
    const count = Collection.find(find).count()
    const items: Object[] = Collection.find(find, { skip, limit: size, sort }).fetch()
    const params = [data, items, true, page, Math.ceil(count / size), filter, sort, search]
    dispatch(setDataSetAction(...params))
  }
}
