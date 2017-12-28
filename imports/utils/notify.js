// @flow

declare var Noty: any

const key = '__flashMessage__'
const timeout = 3000

export const fetchResult = (url: string, text: string) => {
  return (err?: Error) => {
    if (err) {
      // eslint-disable-next-line
      console.error(err)
      if (typeof Noty !== 'undefined') {
        // eslint-disable-next-line
        new Noty({
          text: 'Произошла ошибка при обращении к сервису. Пожалуйста, попробуйте повторить позже',
          timeout,
          type: 'error',
        }).show()
      }
    } else {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, text)
      }
      window.location = url
    }
  }
}

export const successContainer = () => {
  if (typeof localStorage !== 'undefined') {
    const text = localStorage.getItem(key)
    if (text) {
      if (typeof Noty !== 'undefined') {
        // eslint-disable-next-line
        new Noty({ text, timeout, type: 'success' }).show()
      }
    }
    localStorage.removeItem(key)
  }
}
