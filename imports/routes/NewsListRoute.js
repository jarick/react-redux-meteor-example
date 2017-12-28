// @flow

import NewsList from '../components/NewsList'
import { type Route } from '../types'

/* eslint-disable global-require */
const route: Route = {
  exact: true,
  path: '/news',
  component: NewsList,
}
/* eslint-enable global-require */

export default route
