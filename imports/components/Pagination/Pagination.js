// @flow

import React from 'react'
import type { DataSet } from 'redux-dataset'
import uniqueId from 'lodash/uniqueId'
import range from 'lodash/range'
import Link from '../Link'
import { Pagination } from '../App/styled'

type Props = {
  dataSet: DataSet<*>,
  queryParams: Object,
}

const Item = (props: { queryParams: Object }) => {
  const { queryParams } = props
  const query = Object.keys(queryParams)
    .reduce((result, key) => [...result, `${key}=${queryParams[key]}`], [])
    .join('&')
  return (
    <div>
      <Link to={`?${query}`}>
        {queryParams.page}
      </Link>
    </div>
  )
}

export default ({ dataSet: { page, pagesCount }, queryParams }: Props) => {
  const query = Object.keys({ ...queryParams, page })
    .reduce((result, key) => [...result, `${key}=${queryParams[key]}`], [])
    .join('&')
  return !page || !pagesCount || pagesCount < 2 ? null : (
    <Pagination>
      {page - 5 > 1
        ? range(1, Math.min(4, page - 5)).map(number => (
          <Item
            key={uniqueId()}
            queryParams={{ ...queryParams, page: number }}
          />
        ))
        : null
      }
      {page - 5 > 4
        ? (
          <div>
            ...
          </div>
        )
        : null
      }
      {range(Math.max(1, page - 5), page).map(number => (
        <Item
          key={uniqueId()}
          queryParams={{ ...queryParams, page: number }}
        />
      ))}

      <div key={uniqueId()}>
        <Link to={`?${query}`} className="active">
          {page}
        </Link>
      </div>

      {range(Math.min(page + 1, pagesCount + 1), Math.min(page + 6, pagesCount + 1)).map(number => (
        <Item key={uniqueId()} queryParams={{ ...queryParams, page: number }} />
      ))}

      {page < pagesCount - 9
        ? (
          <div>
            ...
          </div>
        )
        : null
      }

      {page < pagesCount - 6
        ? range(Math.max(page + 6, pagesCount - 3), pagesCount + 1).map(number => (
          <Item key={uniqueId()} queryParams={{ ...queryParams, page: number }} />
        ))
        : null
      }
    </Pagination>
  )
}
