// @flow

import { connect, type MapDispatchToProps, type MapStateToProps } from 'react-redux'
import type { Location } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { throttle } from 'throttle-debounce'
import { compose, withHandlers, withPropsOnChange, lifecycle } from 'recompose'
import { getDataSelector, setDataSetAction, removeDataSetAction } from 'redux-dataset'
import type { DataSet } from 'redux-dataset'
import { bindActionCreators } from 'redux'
import type { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { loadListAction } from '../core/actions'
import type { State } from '../types'

type Sort = { [field: string]: 1 | -1 }

export type Props = {
  dataSet: DataSet<File>,
  location: Location,
  page: number,
  size: number,
  filter: Object,
  sort: Sort,
  query: string,
  search: Object,
  subscriptions: string[],
  setSubscriptions: (subscriptions: string[]) => void,
  onUpdate: (page: number, search: Object, sort: Sort, filter: Object) => void,
  actions: {
    setDataSet: (
      id: string,
      data: File[] | null,
      load: boolean,
      page?: number,
      size?: number,
      search?: { [field: string]: string },
      sort?: { [field: string]: 1 | -1 },
      filter?: Object
    ) => void,
    removeDataSet: (id: string) => void
  }
}

export type ListProps = {
  publication: string,
  data: string,
  Collection: Mongo.Collection,
  componentWillReceiveProps?: (nextProps: Props, oldProps: Props) => void,
  componentWillMount?: (props: Props) => void,
}

export default (listProps: ListProps) => {
  const { data, publication, Collection } = listProps
  const mapDispatchToProps: MapDispatchToProps<*, *, *> = (dispatch: Dispatch<*>) => {
    return {
      actions: bindActionCreators({
        load: loadListAction,
        setDataSet: setDataSetAction,
        removeDataSet: removeDataSetAction,
      }, dispatch),
    }
  }
  const mapStateToProps: MapStateToProps<State, *, *> = createStructuredSelector({
    dataSet: getDataSelector(data),
  })

  return compose(
    connect(null, mapDispatchToProps),
    withHandlers({
      onUpdate: (props: Props) => (page, search, sort, filter) => {
        props.actions.setDataSet(data, [], false)
        Meteor.call(publication, page, props.size, search, sort, filter, (err, result) => {
          if (err) {
            // eslint-disable-next-line
            console.error(err)
          } else {
            const { count, items } = result
            const params = [items, true, page, Math.ceil(count / props.size), filter, sort, search]
            props.actions.setDataSet(data, ...params)
          }
        })
      },
    }),
    withPropsOnChange(
      ['onUpdate'],
      ({ onUpdate }) => {
        return {
          onUpdate: throttle(1000, onUpdate),
        }
      },
    ),
    lifecycle({
      componentWillMount() {
        const { page, size, search, sort, filter, actions } = this.props
        if (Meteor.isServer) {
          actions.load({
            Collection,
            data,
            page,
            size,
            search,
            sort,
            filter,
          })
        }
        if (listProps.componentWillMount) {
          listProps.componentWillMount(this.props)
        }
      },
      componentWillUnmount() {
        this.props.actions.removeDataSet(data)
      },
      componentWillReceiveProps(nextProps) {
        if (listProps.componentWillReceiveProps) {
          listProps.componentWillReceiveProps(nextProps, this.props)
        }
      },
    }),
    connect(mapStateToProps),
  )
}
