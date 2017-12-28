// @flow

import { connect } from 'react-redux'
import type { MapStateToProps } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import type { State } from '../types'

/* eslint-disable no-useless-escape */
const nano = (template: string, data: Object) => (
  template.replace(/\{\{([\w\.]*)\}\}/g, (str, key) => {
    const keys = key.split('.')
    let v = data[keys.shift()]

    for (let i = 0, l = keys.length; i < l; i += 1) {
      v = v[keys[i]]
    }
    return (typeof v !== 'undefined' && v !== null) ? v : ''
  })
)
/* eslint-enable */

const mapStateToProps: MapStateToProps<State, *, *> = createStructuredSelector({
  t: (state: State) => {
    return (key, values = {}) => {
      const str = get(state.i18n, key, '')

      return str.length > 0 && Object.keys(values).length > 0 ? nano(str, values) : str
    }
  },
})

export default connect(mapStateToProps)
