// @flow

import Dashboard from '../components/Dashboard'
import { type Route } from '../types'

/* eslint-disable global-require */
const route: Route = {
  exact: true,
  path: '/',
  component: Dashboard,
}
/* eslint-enable global-require */

export default route
