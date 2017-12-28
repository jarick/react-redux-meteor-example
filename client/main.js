// @flow

import { Meteor } from 'meteor/meteor'
import { EJSON } from 'meteor/ejson'
import React, { type Element } from 'react'
import { hydrate } from 'react-dom'
import { createStore, compose, applyMiddleware, type Store } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import uniqueId from 'lodash/uniqueId'
import routes from '../imports/routes'
import type { State } from '../imports/types'
import reducer from '../imports/reducers'

type Props = {
  store: Store<State>
}

const AppWrap = ({ store }: Props): Element<*> => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes.map(route => <Route key={uniqueId()} {...route} />)}
      </Switch>
    </BrowserRouter>
  </Provider>
)

Meteor.startup(() => {
  // eslint-disable-next-line
  const preloadedState = EJSON.fromJSONValue(window.__PRELOADED_STATE__)
  // eslint-disable-next-line
  delete window.__PRELOADED_STATE__
  // eslint-disable-next-line
  const messages = window.__MESSAGES__
  // eslint-disable-next-line
  delete window.__MESSAGES__
  // eslint-disable-next-line
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = composeEnhancers(applyMiddleware(thunk))
  const store: Store<State> = createStore(reducer(), preloadedState, middleware)
  const app = document.getElementById('app')
  if (app) {
    hydrate(<AppWrap store={store} />, app)
  }
})
