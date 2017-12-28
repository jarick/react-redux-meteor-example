// @flow

import Login from '../components/Login'
import { type Route } from '../types'

/* eslint-disable global-require */
const route: Route = {
  exact: true,
  path: '/login',
  component: Login,
}
/* eslint-enable global-require */

export default route
