// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, LoginView, Form } from '../App/styled'


export type Props = {
  t: (str: string) => string,
  handleSubmit: () => void,
  submitting: boolean,
  username: string,
  password: string,
  change: (field: string, value: string) => void,
}

export default ({ t, change, handleSubmit, submitting, username, password }: Props) => {
  return (
    <LoginView>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700"
          rel="stylesheet"
        />
        <title>{t('app.title')}</title>
      </Helmet>
      <Header>
        <div className="title">
          {t('login.title')}
        </div>
      </Header>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="cell">
            <label htmlFor="login">{t('login.login')}</label>
            <div>
              <input
                id="login"
                name="login"
                type="text"
                placeholder={t('login.inputLogin')}
                value={username}
                onChange={e => change('username', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="cell">
            <label htmlFor="password">{t('login.password')}</label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={t('login.inputPassword')}
                value={password}
                onChange={e => change('password', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="button-box">
          <button type="submit" disabled={submitting}>
            {t('login.submit')}
          </button>
        </div>
      </Form>
    </LoginView>
  )
}
