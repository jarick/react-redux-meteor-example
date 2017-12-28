// @flow

import type { Node } from 'react'
import { compose, lifecycle, withState } from 'recompose'


export default compose(
  withState('complete', 'setComplete', false),
  lifecycle({
    componentDidMount() {
      const { setComplete } = this.props
      if (typeof document === 'undefined') {
        setComplete(true)
      } else if (document.readyState === 'complete') {
        setComplete(true)
      } else {
        document.addEventListener('readystatechange', function docStateChange (e) {
          if (e.target.readyState === 'complete') {
            e.target.removeEventListener('readystatechange', docStateChange)
            setComplete(true)
          }
        })
      }
    },
  }),
)(({ complete, children }: { complete: boolean, children: Node }) => {
  return complete ? children : null
})
