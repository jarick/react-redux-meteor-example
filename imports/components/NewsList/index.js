// @flow

import React from 'react'
import NewsList from './NewsList'
import type { Props } from './NewsList'
import NewsListContainer from '../../containers/NewsListContainer'


export default NewsListContainer((props: Props) => {
  return <NewsList {...props} />
})
