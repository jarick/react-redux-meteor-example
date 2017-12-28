// @flow

import { Mongo } from 'meteor/mongo'


export const Pages = new Mongo.Collection('pages', { idGeneration: 'MONGO' })

export type Page = {
  _id: Mongo.ObjectID,
  tag: string,
  code: string,
  title: string,
  description: string,
  body: string,
  section: number,
  external_id: number | null,
  status: number,
  date: Date,
}

export type User = {
  username: string
}

export type UserState = {
  user: User | null
}

export type State = {
  form: any,
  dataSet: any,
  i18n: Object
}

export type Route = {
  exact?: boolean,
  path?: string,
  component: any
}
