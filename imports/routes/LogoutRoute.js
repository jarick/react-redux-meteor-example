// @flow

import Logout from '../components/Logout'
import { type Route } from '../types'


/* eslint-disable global-require */
const route: Route = {
  exact: true,
  path: '/logout',
  component: Logout,
}
/* eslint-enable global-require */

export default route
