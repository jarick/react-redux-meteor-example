// @flow

import { Meteor } from 'meteor/meteor'
import { EJSON } from 'meteor/ejson'
import { WebApp } from 'meteor/webapp'
import express from 'express'
import uniqueId from 'lodash/uniqueId'
import { createStore, applyMiddleware, type Store } from 'redux'
import thunk from 'redux-thunk'
import { setDataSetAction } from 'redux-dataset'
import omit from 'lodash/omit'
import React, { type Element, type Node } from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import sha from 'sha.js'
import { Helmet } from 'react-helmet'
import routes from '../imports/routes'
import reducer from '../imports/reducers'
import { type State } from '../imports/types'
import i18n from '../imports/constants/i18n.js'
import { userData } from '../imports/constants/data'
import cookieParser from '../imports/utils/cookieParser'


Meteor.startup(() => {
  // eslint-disable-next-line
  require('../imports/fixtures')

  const app = express()
  WebApp.connectHandlers.use(app)

  type Props = {
    location: string,
    store: Store<State>
  }

  const AppWrap = ({ store, ...props }: Props): Element<*> => (
    <Provider store={store}>
      <StaticRouter {...props}>
        <Switch>
          {routes.map(route => <Route key={uniqueId()} {...route} />)}
        </Switch>
      </StaticRouter>
    </Provider>
  )

  const renderHeader = (styles: string, helmet: Helmet) => `
  ${helmet.meta.toString()}
  ${helmet.title.toString()}
  ${styles}
  ${helmet.link.toString()}
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
`
  const renderPreloadedState = ({ preloadedState }) => {
    const state = EJSON.toJSONValue(preloadedState)

    return `
  <script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)}</script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/noty/3.1.4/noty.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.4/tinymce.min.js"></script>
`
}

  WebApp.connectHandlers.use((req: any, res: any, next: () => void) => {
    const sheet = new ServerStyleSheet()
    const store: Store<State> = createStore(reducer(i18n), applyMiddleware(thunk))
    store.dispatch(setDataSetAction(userData, req.user ? [req.user] : null, true))
    // eslint-disable-next-line
    const cookies = cookieParser(req.headers.cookie || '')
    const getUserByToken = (token: string) => {
      const hashedToken = sha('sha256').update(token).digest('base64')
      const user = Meteor.users.findOne({ 'services.resume.loginTokens.hashedToken': hashedToken })

      return omit(user, ['services'])
    }
    const token = cookies.MeteorLoginToken
    const users = token ? [getUserByToken(token)] : null
    store.dispatch(setDataSetAction(userData, users, true))

    const context = {}
    const dom: Node = (
      <AppWrap
        store={store}
        location={req.url}
        context={context}
      />
    )
    const body = renderToString(sheet.collectStyles(dom))
    const preloadedState = store.getState()
    const helmet = Helmet.renderStatic()
    const styles = sheet.getStyleTags()
    const originalWrite = res.write

    res.write = function (data) {
      const save = data
        .replace('</head>', `${renderHeader(styles, helmet)}</head>`)
        .replace('<body>', `<body><div id="app">${body}</div>`)
        .replace('</body>', `${renderPreloadedState({ preloadedState })}</body>`)
      originalWrite.call(this, save)
    }
    const { status, action, url } = context
    if (action) {
      res.writeHead(302, { Location: url })
      res.end()
    } else {
      res.statusCode = status || 200
      next()
    }
  })
})
