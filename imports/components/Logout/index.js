// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import LogoutContainer from '../../containers/LogoutContainer'
import type { User } from '../../types'
import Loader from '../Loader'


type Props = {
  user: User | null
}

export default LogoutContainer(({ user }: Props) => {
  return !user ? <Redirect to="/login" /> : <Loader />
})
