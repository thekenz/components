import * as styledComponents from 'styled-components'
import { ThemeInterface } from './themes'
export { StyledComponentClass } from 'styled-components'

const {
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents

// Typescript complains that the `as ThemedStyledComponentsModule` performs
// unnecessary casting, which is not true. Without this line the Themes
// attached to component prop types would not type-check correctly.
//
// tslint:disable-next-line:no-unnecessary-type-assertion
const styled = (styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>).default

export {
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
}

export default styled
