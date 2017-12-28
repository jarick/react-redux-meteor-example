// @flow

import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'
import type { MapStateToProps } from 'react-redux'
import type { Dispatch } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { getDataSelector } from 'redux-dataset'
import { compose, withState } from 'recompose'
import get from 'lodash/get'
import type { State } from '../types'
import withLocale from '../core/withLocale'
import { fetchResult } from '../utils/notify'


const form = 'login'
const selector = formValueSelector(form)

const mapStateFormToProps: MapStateToProps<State, *, *> = (state) => {
  const data = getDataSelector('user')(state)
  const user = get(data, 'data[0]', null)

  return {
    user,
    username: selector(state, 'username'),
    password: selector(state, 'password'),
  }
}

type FormValue = {
  username: string,
  password: string
}

type Props = {
  t: (str: string) => string
}

export default compose(
  withLocale,
  withState('isSend', 'setSend', false),
  reduxForm({
    form,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit({ username, password }: FormValue, dispatch: Dispatch<*>, { t }: Props) {
      return new Promise((resolve) => {
        Meteor.loginWithPassword(username, password, (err) => {
          if (!err) {
            const token = localStorage.getItem('Meteor.loginToken')
            if (token) {
              document.cookie = `MeteorLoginToken=${token}; expires=0; path=/`
            }
          }
          fetchResult('/', t('app.welcome'))(err)
          resolve()
        })
      })
    },
  }),
  connect(mapStateFormToProps),
)
