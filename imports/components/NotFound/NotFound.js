// @flow

import React, { type Element } from 'react'
import App from '../App'
import { Header } from '../App/styled'
import withLocale from '../../core/withLocale'


type Props = {
  t: (str: string) => string
}

export default withLocale(({ t }: Props): Element<*> => {
  return (
    <App>
      <Header>
        <div className="title">{t('app.notFound')}</div>
      </Header>
    </App>
  )
})
