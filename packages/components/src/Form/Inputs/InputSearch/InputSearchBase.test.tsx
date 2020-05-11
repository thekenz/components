/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

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
import {
  mountWithTheme,
  assertSnapshot,
  renderWithTheme,
} from '@looker/components-test-utils'
import { InputSearchBase } from './InputSearchBase'

test('InputSearchBase default', () => {
  assertSnapshot(<InputSearchBase />)
})

test('InputSearchBase searchIcon={false} removes the icon', () => {
  assertSnapshot(<InputSearchBase searchIcon={false} />)
})

test('InputSearchBase displays placeholder', () => {
  const wrapper = mountWithTheme(
    <InputSearchBase placeholder="Type your search" />
  )
  expect(wrapper.props().children.props.placeholder).toEqual('Type your search')
})

test('InputSearchBase displays value', () => {
  const wrapper = mountWithTheme(<InputSearchBase value="start value" />)
  expect(wrapper.props().children.props.value).toEqual('start value')
})

test('InputSearchBase displays summary', () => {
  const wrapper = mountWithTheme(
    <InputSearchBase value="start value" summary="summary value" />
  )
  expect(wrapper.props().children.props.summary).toEqual('summary value')
})

test('InputSearchBase clears bottom when input value is empty', () => {
  const wrapper = mountWithTheme(<InputSearchBase value="start value" />)

  expect(wrapper.find('input').props().value).toEqual('start value')
  wrapper.find('button').simulate('click')
  expect(wrapper.find('input').props().value).toEqual('')
})

test('InputSearchBase shows clear button and summary', () => {
  const wrapper = mountWithTheme(
    <InputSearchBase value="start value" summary="summary value" />
  )
  expect(wrapper.find('button').exists()).toEqual(true)
  expect(wrapper.props().children.props.summary).toEqual('summary value')
})

test('InputSearchBase hides controls when using hideControls option', () => {
  const wrapper = mountWithTheme(
    <InputSearchBase value="start value" summary="summary value" />
  )
  expect(wrapper.find('button').exists()).toEqual(false)
})

test('InputSearchBase accepts a defaultValue', () => {
  const { getByPlaceholderText } = renderWithTheme(
    <InputSearchBase defaultValue="replace me" placeholder="type here" />
  )
  const input = getByPlaceholderText('type here')
  expect(input).toHaveValue('replace me')
})
