// @flow

import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'
import type { MapStateToProps } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import get from 'lodash/get'
import { getDataSelector } from 'redux-dataset'
import type { State } from '../types'
import { fetchResult } from '../utils/notify'
import withLocale from '../core/withLocale'


const mapStateToProps: MapStateToProps<State, *, *> = (state) => {
  const data = getDataSelector('user')(state)
  const user = get(data, 'data[0]', null)

  return { user }
}

export default compose(
  withLocale,
  connect(mapStateToProps),
  lifecycle({
    componentWillMount() {
      const { user, t } = this.props

      if (user && Meteor.isClient) {
        Meteor.logout((err?: Error) => {
          document.cookie = 'MeteorLoginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          fetchResult('/login', t('app.exit'))(err)
        })
      }
    },
  }),
)
