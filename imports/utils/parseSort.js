// @flow

export default (
  sort: string,
  fields: string[],
  defKey: string = '_id',
  defSort: 1 | -1 = -1,
): { key: string, order: 1 | -1 } => {
  const parts = sort.split(':')
  return parts.length === 2
    ? {
      key: fields.includes(parts[0]) ? parts[0] : defKey,
      order: parts[1] === '1' ? 1 : -1,
    }
    : {
      key: defKey,
      order: defSort,
    }
}
