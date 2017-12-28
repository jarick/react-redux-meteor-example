// @flow

import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { connect, type MapDispatchToProps, type MapStateToProps } from 'react-redux'
import { change as changeAction } from 'redux-form'
import { compose, lifecycle } from 'recompose'
import { setDataSetAction, removeDataSetAction } from 'redux-dataset'
import { bindActionCreators, type Dispatch } from 'redux'
import type { State } from '../types'
import { loadListAction } from '../core/actions'
import type { LoadListPayload } from './actions'


export type Props = {
  handleSubmit: () => void,
  submitting: boolean,
  id?: string,
  html: string,
  query: string,
  change(field: string, value: string): void,
  actions: {
    load: (payload: LoadListPayload) => void,
    setDataSet: (id: string, data: File[] | null, load: boolean) => void,
    removeDataSet: (id: string) => void
  },
  subscribeActions: {
    subscribeAction: (subscription: string, ...args: any[]) => void,
    stopAction: (subscription: string) => void
  }
}

type MapDispatch = MapDispatchToProps<*, *, *>

const mapDispatchToProps: MapDispatch = (dispatch: Dispatch<*>, props: Props): Props => {
  return {
    ...props,
    actions: bindActionCreators({
      load: loadListAction,
      setDataSet: setDataSetAction,
      removeDataSet: removeDataSetAction,
      change: changeAction,
    }, dispatch),
  }
}

export type SaveProps = {
  mapStateToProps: MapStateToProps<State, *, *>,
  data: string,
  Collection: Meteor.Collection
}

export default ({ mapStateToProps, data, Collection }: SaveProps) => {
  return compose(
    connect(null, mapDispatchToProps),
    lifecycle({
      componentWillMount() {
        const { id, actions } = this.props
        if (Meteor.isServer) {
          if (!id) {
            actions.setDataSet(data, [])
          } else {
            actions.load({
              Collection,
              data,
              page: 1,
              size: 1,
              search: {},
              sort: {},
              filter: { _id: new Mongo.ObjectID(id, { idGeneration: 'MONGO' }) },
            })
          }
        }
      },
      componentWillUnmount() {
        this.props.actions.removeDataSet(data)
      },
    }),
    connect(mapStateToProps),
  )
}
