// @flow

import { connect } from 'react-redux'
import type { MapStateToProps } from 'react-redux'
import { getDataSelector } from 'redux-dataset'
import type { DataSet } from 'redux-dataset'
import { compose } from 'recompose'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import type { State, User } from '../types'
import { userData } from '../constants/data'
import withLocale from '../core/withLocale'

const mapStateToProps: MapStateToProps<State, *, *> = (state: State) => {
  const dataSet: DataSet<User> = getDataSelector(userData)(state)

  return {
    user: get(dataSet, 'data[0]', null),
  }
}

export default compose(
  withRouter,
  withLocale,
  connect(mapStateToProps),
)
