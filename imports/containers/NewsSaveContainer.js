// @flow

import { Meteor } from 'meteor/meteor'
import { connect } from 'react-redux'
import type { MapStateToProps } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { compose, withProps } from 'recompose'
import slug from 'slugify'
import { getDataSelector, type DataSet } from 'redux-dataset'
import get from 'lodash/get'
import has from 'lodash/has'
import omit from 'lodash/omit'
import type { Dispatch } from 'redux'
import { withRouter } from 'react-router-dom'
import type { State, Page } from '../types'
import { newsData } from '../constants/data'
import { savePage, loadPages } from '../constants/methods'
import createSaveContainer from '../core/createSaveContainer'
import { Pages } from '../types'
import { fetchResult } from '../utils/notify'
import withLocale from '../core/withLocale'


const form = 'news'
const selector = formValueSelector(form)

const mapStateToProps: MapStateToProps<State, *, *> = (state, { id }) => {
  const dataSet: DataSet<Page> = getDataSelector(newsData)(state)
  const data = get(dataSet, 'data[0]', {
    _id: null,
    tag: 'news',
    code: '',
    title: '',
    description: '',
    body: '',
    section: '',
    external_id: null,
    status: 1,
    date: new Date(),
  })
  const date = typeof data.date === 'string' ? new Date(data.date) : data.date

  return {
    isFound: !id || has(dataSet, 'data[0]'),
    initialValues: {
      ...data,
      date: date.toISOString().substring(0, 10),
    },
  }
}

const mapStateFormToProps: MapStateToProps<State, *, *> = (state) => {
  return {
    html: selector(state, 'body'),
  }
}

export default compose(
  withRouter,
  withLocale,
  withProps(({ match: { params }, location: { search } }) => {
    const { id } = params

    return { id, form, query: search }
  }),
  createSaveContainer({
    mapStateToProps,
    publication: loadPages,
    data: newsData,
    Collection: Pages,
  }),
  reduxForm({
    form,
    enableReinitialize: true,
    onSubmit(values: Page, dispatch: Dispatch<*>, { query, t }: Object) {
      const save = omit(values, ['_id'])

      Meteor.call(savePage, {
        ...save,
        id: values._id,
        date: new Date(values.date),
        code: slug(values.title),
        description: `ИП Золотарёв М.Ю | ${values.title}`,
        section: parseInt(values.section, 10),
        status: parseInt(values.status, 10),
      }, fetchResult(`/news${query}`, t('news.save.successSave')))
    },
  }),
  connect(mapStateFormToProps),
)
