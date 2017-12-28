// @flow

import React from 'react'
import type { Element, Node } from 'react'

type Props = {
  to: string,
  children?: Node
}

export default ({ to, children, ...props }: Props): Element<*> => {
  return (
    <a href={to} {...props}>{children}</a>
  )
}
