// @flow

import NewsSave from '../components/NewsSave'
import { type Route } from '../types'

/* eslint-disable global-require */
const route: Route = {
  exact: true,
  path: '/news/new',
  component: NewsSave,
}
/* eslint-enable global-require */

export default route
