// @flow

export default (str: string): string => {
  // eslint-disable-next-line
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}
