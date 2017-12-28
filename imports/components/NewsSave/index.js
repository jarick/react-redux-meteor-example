// @flow

import React, { type Element } from 'react'
import NewsSave, { type Props as NewsProps } from './NewsSave'
import NewsSaveContainer from '../../containers/NewsSaveContainer'
import NotFound from '../NotFound'

type Props = NewsProps & {
  isFound: boolean,
}

export default NewsSaveContainer(({ isFound, ...props }: Props): Element<*> => {
  return !isFound ? <NotFound /> : <NewsSave {...props} />
})

