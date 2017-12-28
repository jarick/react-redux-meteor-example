declare module 'redux-dataset' {
  declare type DataSet<P: Object> = {
    data: P[] | null,
    load: boolean,
    pagesCount: number | null,
    page: number | null,
    filter: Object,
    sort: Object,
    search: Object
  }
  declare type SetDataSetPayload<P: Object> = {
    id: string,
    data: DataSet<P>
  }
  declare type SetDataSetAction<P: Object> = {
    type: string,
    payload: SetDataSetPayload<P>
  }
  declare function setDataSetAction<P: Object>(...args: any[]): SetDataSetAction<P>
  declare type RemoveDataSetPayload = {
    id: string
  }
  declare type RemoveDataSetAction = {
    type: string,
    payload: RemoveDataSetPayload
  }
  declare function removeDataSetAction(...args: any[]): RemoveDataSetAction
  declare type DataSetState<P: Object> = {
    [id: string]: DataSet<P>
  }
  declare type GlobalDataSetState<P: Object> = {
    dataSet: DataSetState<P>
  }
  declare function getDataSelector(data: string): (state: GlobalDataSetState<*>) => DataSet<*>
  declare function reducer<P: Object>(): () => any
}
