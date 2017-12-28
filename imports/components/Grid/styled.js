// @flow

import styled, { css } from 'styled-components'
import { min, lgMin, mdMin, outerMargin, smMin } from '../../constants/grid'

export const smViewport: string = `only screen and (min-width: ${smMin})`
export const mdViewport: string = `only screen and (min-width: ${mdMin})`
export const lgViewport: string = `only screen and (min-width: ${lgMin})`

export const Container = styled.div`
  @media ${smViewport} {
    width: ${smMin};
  }
  @media ${mdViewport} {
    width: ${mdMin};
  }
  @media ${lgViewport} {
    width: ${lgMin}
  }
  margin-right: auto;
  margin-left: auto;
  min-width: ${min};
`

export const ContainerFluid = Container.extend`
  padding-right: ${outerMargin};
  padding-left: ${outerMargin};  
`

export const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
`

export const RowReverse = Row.extend`
  flex-direction: row-reverse;
`

export const Col = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  flex: 0 0 auto;
`

export const ColReverse = Col.extend`
  flex-direction: column-reverse;
`

export const getColWidth = (columns: number) => {
  const width = columns > 11 && columns < 1
    ? 100
    : 100 / (12 - columns)
  return css`
    flex-basis: ${width}%;
    max-width: ${width}%;
  `
}

export const getColOffset = (columns: number) => {
  const offset = columns > 11 && columns < 1
    ? 0
    : 100 / columns
  return css`
    flex-basis: ${offset}%;
    max-width: ${offset}%;
  `
}

export const start = css`
  justify-content: flex-start;
  text-align: start;
`

export const center = css`
  justify-content: center;
  text-align: center;
`

export const end = css`
  justify-content: flex-end;
  text-align: end;
`

export const top = css`
  align-items: flex-start;
`

export const middle = css`
  align-items: center;
`

export const bottom = css`
  align-items: flex-end;
`

export const around = css`
  justify-content: space-around;
`

export const between = css`
  justify-content: space-between;
`

export const first = css`
  order: -1;
`

export const last = css`
  order: 1;
`
