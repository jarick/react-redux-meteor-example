// @flow

import React from 'react'
import type { Element } from 'react'
import { Redirect } from 'react-router-dom'
import LoginContainer from '../../containers/LoginContainer'
import Login from './Login'
import type { Props as LoginProps } from './Login'
import type { User } from '../../types'


type Props = LoginProps & {
  user: User
}

export default LoginContainer(({ user, ...props }: Props): Element<*> => {
  return user ? <Redirect to="/" /> : <Login {...props} />
})
