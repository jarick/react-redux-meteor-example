// @flow

import React from 'react'
import uniqueId from 'lodash/uniqueId'
import type { DataSet } from 'redux-dataset'
import App from '../App'
import Link from '../Link'
import { Table, Header } from '../App/styled'
import Pagination from '../Pagination'
import type { Page } from '../../types'
import Loader from '../Loader'


export type Props = {
  dataSet: DataSet<Page>,
  page: number,
  sort: {[field: string]: -1 | 1 },
  onUpdate: (
    page: number,
    search: {[field: string]: string },
    sort: {[field: string]: -1 | 1 },
    filter: {}
  ) => void,
  search: { title: string },
  setQuery: (s: string) => void,
  t: (str: string) => string
}

export default ({ t, dataSet, onUpdate, search, page, sort, setQuery }: Props) => {
  const sortKey: string = Object.keys(sort)[0]
  const sortOrder: 1 | -1 = Object.values(sort)[0] === 1 ? 1 : -1

  return !dataSet ? null : (
    <App>
      <Header>
        <div className="title">
          {t('news.list.title')}
        </div>
        <div className="button-box">
          <Link
            className="button"
            to={`/news/new?sort=${sortKey}:${sortOrder}&page=${page}&search=${search.title}`}
          >
            {t('news.list.add')}
          </Link>
        </div>
        <div className="sort-search-box">
          <div className="sort-box">
            <span className="label">
              {t('news.list.sort')}:
            </span>
            <Link
              className="link"
              to={`?page=1&sort=date:${sortKey === 'date' && sortOrder === 1 ? -1 : 1}`}
            >
              {t('news.list.dateOfPublish')}
              {sortKey === 'date' && sortOrder === 1 ? ' ▲' : ''}
              {sortKey === 'date' && sortOrder === -1 ? ' ▼' : ''}
            </Link>
            <Link
              className="link"
              to={`?page=1&sort=title:${sortKey === 'title' && sortOrder === 1 ? -1 : 1}`}
            >
              {t('news.list.sortByTitle')}
              {sortKey === 'title' && sortOrder === 1 ? ' ▲' : ''}
              {sortKey === 'title' && sortOrder === -1 ? ' ▼' : ''}
            </Link>
          </div>
          <div className="search-wrap">
            <input
              type="search"
              value={search.title}
              onChange={(e) => {
                setQuery(e.target.value)
                onUpdate(1, { title: e.target.value }, sort, { tag: 'news' })
              }}
            />
          </div>
        </div>
      </Header>
      {!dataSet.load ? <Loader /> : (
        <Table>
          <thead>
            <tr>
              <th>{t('news.list.sortByTitle')}</th>
              <th width="80px">{t('news.list.date')}</th>
            </tr>
          </thead>
          <tbody>
            {!dataSet.data ? null : dataSet.data.map((item: Page) => (
              <tr key={uniqueId()}>
                <td className="title-td">
                  <Link
                    to={`/news/${item._id.toHexString()}?sort=${sortKey}:${sortOrder}&page=${page}`
                      + `&search=${search.title}`}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                </td>
                <td>{item.date.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination
        dataSet={dataSet}
        queryParams={{ page, sort: `${sortKey}:${sortOrder}`, search: search.title }}
      />
    </App>
  )
}
