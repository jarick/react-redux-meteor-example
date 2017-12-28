// @flow

const pairSplitRegExp = /; */

const tryDecode = (str: string, decode: (str: string) => string): string => {
  try {
    return decode(str)
  } catch (e) {
    return str
  }
}

export default (str: string): Object => {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string')
  }

  const obj = {}
  const pairs = str.split(pairSplitRegExp)

  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i]
    let eqIdx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eqIdx > 0) {
      const key = pair.substr(0, eqIdx).trim()
      eqIdx += 1
      let val = pair.substr(eqIdx, pair.length).trim()

      if (val[0] === '"') {
        val = val.slice(1, -1)
      }

      // only assign once
      if (undefined === obj[key]) {
        obj[key] = tryDecode(val, decodeURIComponent)
      }
    }
  }

  return obj
}
