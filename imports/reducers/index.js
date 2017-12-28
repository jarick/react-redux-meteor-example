// @flow

import { combineReducers } from 'redux'
import type { Reducer } from 'redux'
import { reducer as dataSetReducer } from 'redux-dataset'
import { reducer as formReducer } from 'redux-form'
import type { State } from '../types'

export default (locale: Object = {}): Reducer<State> => {
  const i18n = (state = locale) => state

  return combineReducers({
    form: formReducer,
    dataSet: dataSetReducer,
    i18n,
  })
}
