// @flow

import { compose, withState, withProps } from 'recompose'
import URLSearchParams from 'url-search-params'
import { withRouter } from 'react-router-dom'
import { Pages } from '../types'
import { loadPages } from '../constants/methods'
import { newsData } from '../constants/data'
import createListContainer from '../core/createListContainer'
import type { Props } from '../core/createListContainer'
import parseSort from '../utils/parseSort'
import { successContainer } from '../utils/notify'
import withLocale from '../core/withLocale'


export default compose(
  withRouter,
  withLocale,
  withState('query', 'setQuery', ({ location }: Props): string => {
    const params = new URLSearchParams(location.search)

    return params.get('search') || ''
  }),
  withProps((props: Props): Props => {
    const params = new URLSearchParams(props.location.search)
    const page = parseInt(params.get('page') || 1, 10)
    const { key, order } = parseSort(params.get('sort') || '', ['date', 'title'], 'date', -1)
    const sort = { [key]: order }

    return {
      ...props,
      page,
      size: 20,
      sort,
      filter: { tag: 'news' },
      search: { title: props.query },
    }
  }),
  createListContainer({
    publication: loadPages,
    data: newsData,
    Collection: Pages,
    componentWillMount() {
      successContainer()
    },
  }),
)
