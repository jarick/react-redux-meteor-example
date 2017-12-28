// @flow

import { type Route } from '../types'
import DashboardRoute from './DashboardRoute'
import NotFoundRoute from './NotFoundRoute'
import NewsListRoute from './NewsListRoute'
import NewsAddRoute from './NewsAddRoute'
import NewsEditRoute from './NewsEditRoute'
import LoginRoute from './LoginRoute'
import LogoutRoute from './LogoutRoute'


const routes: Route[] = [
  LoginRoute,
  LogoutRoute,
  DashboardRoute,
  NewsListRoute,
  NewsAddRoute,
  NewsEditRoute,
  NotFoundRoute,
]

export default routes
