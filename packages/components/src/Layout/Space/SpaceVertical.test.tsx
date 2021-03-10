/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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

import 'jest-styled-components'
import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import { SpaceVertical } from './SpaceVertical'

const content = (
  <>
    <div>one</div>
    <div>two</div>
    <div>three</div>
    <div>four</div>
  </>
)

describe('SpaceVertical', () => {
  xtest('default', () => {
    renderWithTheme(<SpaceVertical>{content}</SpaceVertical>)
    expect(screen.getByText('one')).toHaveStyle('margin-top: 0rem;')

    expect(screen.getByText('one')).toHaveStyle('margin-top: 0rem')
    expect(screen.getByText('two')).toHaveStyle('margin-top: 1rem')
  })

  xtest('specified gap', () => {
    renderWithTheme(<SpaceVertical gap="xlarge">{content}</SpaceVertical>)
    expect(screen.getByText('four')).toHaveStyle('margin-top: 2rem')
    expect(screen.getByText('one')).not.toHaveStyle('margin-top')
  })

  test('reversed', () => {
    renderWithTheme(
      <SpaceVertical data-testid="space" reverse>
        {content}
      </SpaceVertical>
    )
    expect(screen.getByTestId('space')).toHaveStyle(
      'flex-direction: column-reverse;'
    )
  })
})
