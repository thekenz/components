/*

 MIT License

 Copyright (c) 2019 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { Children, cloneElement, FC } from 'react'
import styled from 'styled-components'
import { SpaceProps, space, reset } from '@looker/design-tokens'
import omit from 'lodash/omit'

export interface TabPanelsProps extends SpaceProps {
  /**
   * adds text when input value in not empty
   * @i18n 'recommended'
   */
  children: JSX.Element[]
  selectedIndex?: number
  onSelectTab?: (index: number) => void
}

export const TabPanels: FC<TabPanelsProps> = ({
  children,
  selectedIndex,
  ...props
}) => {
  const spaceProps = omit(props, 'onSelectTab')

  const clonedChildren = Children.map(
    children,
    (child: JSX.Element, index: number) => {
      return cloneElement(child, {
        selected: index === selectedIndex,
      })
    }
  )

  return <Layout {...spaceProps}>{clonedChildren}</Layout>
}

const Layout = styled.div<SpaceProps>`
  ${reset}
  ${space}
`

Layout.defaultProps = { pt: 'large' }
