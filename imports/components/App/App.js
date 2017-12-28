// @flow

import React, { type Element, type Node } from 'react'
import { Helmet } from 'react-helmet'
import { type Location } from 'react-router-dom'
import Link from '../Link'
import { View, NavBar, NavBarContainer, NavBarItem } from './styled'


export type Props = {
  children: Node,
  location: Location,
  t: (str: string) => string,
}

export default ({ children, t, location: { pathname, search } }: Props): Element<*> => {
  const isActive = (url, exact) => {
    const path = `${pathname}${search}`
    return exact ? path === url : path.startsWith(url)
  }

  return (
    <View>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700"
          rel="stylesheet"
        />
        <title>{t('app.title')}</title>
      </Helmet>
      <NavBar>
        <NavBarContainer>
          <NavBarItem>
            <Link className={isActive('/news', false) ? 'active' : ''} to="/news">
              {t('app.news')}
            </Link>
          </NavBarItem>
          <NavBarItem>
            <Link className={isActive('/logout', true) ? 'active' : ''} to="/logout">
              {t('app.exit')}
            </Link>
          </NavBarItem>
        </NavBarContainer>
      </NavBar>
      {children}
    </View>
  )
}
