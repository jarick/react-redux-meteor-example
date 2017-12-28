// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import AppContainer from '../../containers/AppContainer'
import App from './App'
import type { Props as UserProps } from './App'
import type { User } from '../../types'


type Props = UserProps & {
  user: User
}

export default AppContainer(({ user, ...props }: Props) => {
  return !user ? <Redirect to="/login" /> : <App {...props} />
})
