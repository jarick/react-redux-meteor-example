// @flow

import React, { type Element } from 'react'
import { Redirect } from 'react-router-dom'

export default (): Element<*> => {
  return <Redirect to="/news" />
}
