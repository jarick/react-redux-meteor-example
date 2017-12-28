// @flow

import React, { type Element } from 'react'
import TinyMCE from 'react-tinymce'
import { Field } from 'redux-form'
import App from '../App'
import Link from '../Link'
import ReadyStateComplete from '../ReadyStateComplete'
import { Header, Form } from '../App/styled'


export type Props = {
  handleSubmit: () => void,
  submitting: boolean,
  id?: string,
  html: string,
  query: string,
  change(field: string, value: string): void,
  t: (str: string) => string
}

export default (props: Props): Element<*> => {
  const { t, id, html, query, change, submitting } = props

  return (
    <App>
      <Header>
        <div className="button-box">
          <Link className="button" to={`/news${query}`}>
            {t('news.save.back')}
          </Link>
        </div>
        <div className="title">
          {id ? t('news.save.edit') : t('news.save.add')}
        </div>
      </Header>
      <Form onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="cell">
            <label htmlFor="title">{t('news.save.title')}</label>
            <div>
              <Field
                id="title"
                name="title"
                component="input"
                type="text"
                placeholder={t('news.save.inputTitle')}
                required
              />
            </div>
          </div>
          <div className="cell">
            <label htmlFor="status">{t('news.save.status')}</label>
            <div>
              <Field id="status" name="status" component="select">
                <option value="1">{t('news.save.yes')}</option>
                <option value="0">{t('news.save.no')}</option>
              </Field>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <label htmlFor="section">{t('news.save.section')}</label>
            <div>
              <Field id="section" name="section" component="select" required>
                <option />
                <option value="1">{t('news.save.section.main')}</option>
                <option value="2">{t('news.save.section.faq')}</option>
              </Field>
            </div>
          </div>
          <div className="cell">
            <label htmlFor="date">{t('news.save.section.date')}</label>
            <div>
              <Field
                id="date"
                name="date"
                component="input"
                type="date"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cellFull">
            <label htmlFor="body">{t('news.save.section.text')}</label>
            <ReadyStateComplete>
              <TinyMCE
                content={html || ''}
                config={{
                  height: 500,
                  theme: 'modern',
                  plugins: 'link code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                  convert_urls: false,
                }}
                onChange={e => change('body', e.target.getContent())}
              />
            </ReadyStateComplete>
          </div>
        </div>
        <div className="button-box">
          <button type="submit" disabled={submitting}>
            {t('news.save.submit')}
          </button>
        </div>
      </Form>
    </App>
  )
}
