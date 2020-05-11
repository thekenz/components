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

import React, { FC, useEffect, useState, FormEvent } from 'react'
import styled from 'styled-components'
import { Icon } from '../../../Icon'
import { InputSearchBase, InputSearchBaseProps } from './InputSearchBase'
import { InputSearchClear } from './InputSearchClear'

export interface InputSearchProps
  extends Omit<
    InputSearchBaseProps,
    'searchIcon' | 'searchControls' | 'validationType'
  > {
  summary?: string
  hideControls?: boolean
  hideSearchIcon?: boolean
}

export const SearchIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.palette.charcoal400};
  padding-left: ${(props) => props.theme.space.small};
`

export const InputSearch: FC<InputSearchProps> = ({
  summary,
  value: valueProp,
  disabled,
  hideControls = false,
  hideSearchIcon = false,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(valueProp)

  const handleClear = () => {
    setValue('')
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value
    setValue(newValue)
    onChange && onChange(e)
  }

  useEffect(() => {
    setValue(valueProp)
  }, [valueProp])

  return (
    <InputSearchBase
      {...props}
      value={value}
      onChange={handleChange}
      searchIcon={
        hideSearchIcon ? undefined : <SearchIcon name="Search" size={30} />
      }
      searchControls={
        !hideControls ? (
          <InputSearchClear
            onClear={handleClear}
            disabled={disabled}
            summary={summary}
            showClear={!!(value && value.length >= 0)}
          />
        ) : undefined
      }
    />
  )
}
