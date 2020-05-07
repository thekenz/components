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
import React, {
  FormEvent,
  forwardRef,
  KeyboardEvent,
  Ref,
  Children,
  useContext,
} from 'react'
import styled from 'styled-components'
import { MaxHeightProps } from 'styled-system'
import { Icon } from '../../../Icon'
import { Chip } from '../../../Chip'
import { Flex } from '../../../Layout'
import { ComboboxContext } from '../Combobox/ComboboxContext'
import { InputText } from '../InputText'
import {
  InputSearch,
  InputSearchProps,
  InputSearchControls,
} from '../InputSearch'

export interface InputChipsInputControlProps {
  /**
   * for controlling the input text
   */
  inputValue: string
  /**
   * callback when the input text changes (use with inputValue to control the input text)
   */
  onInputChange: (value: string) => void
}

export interface InputChipsControlProps {
  /**
   * InputChips is a controlled component since unlike native inputs,
   * you can't easily access the current value via dom API
   */
  values: string[]
  /**
   * InputChips is a controlled component since unlike native inputs,
   * you can't easily access the current value via dom API
   */
  onChange: (values: string[]) => void
  onClear?: () => void
}

export interface InputChipsCommonProps
  extends Omit<
      InputSearchProps,
      'value' | 'defaultValue' | 'onChange' | 'summary'
    >,
    MaxHeightProps {}

export interface InputChipsBaseProps
  extends InputChipsCommonProps,
    InputChipsControlProps,
    InputChipsInputControlProps {}

export const InputChipsBaseInternal = forwardRef(
  (
    {
      values,
      onChange,
      onKeyDown,
      inputValue,
      onInputChange,
      disabled,
      validationType,
      onClear,
      ...props
    }: InputChipsBaseProps & InputChipsInputControlProps,
    ref: Ref<HTMLInputElement>
  ) => {
    // TODO: get this context wired up
    const { isVisible } = useContext(ComboboxContext)

    function handleDeleteChip(value: string) {
      const newValues = values.filter((v) => value !== v)
      onChange(newValues)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      onKeyDown && onKeyDown(e)
      if (e.key === 'Backspace' && !e.defaultPrevented) {
        // If we hit backspace and there is no text left to delete, remove the last entry instead
        inputValue === '' && handleDeleteChip(values[values.length - 1])
      }
    }

    function handleClear() {
      onClear && onClear()
      onChange([])
      onInputChange('')
    }

    const chips = values.map((value) => {
      function onChipDelete() {
        handleDeleteChip(value)
      }
      return (
        <Chip onDelete={onChipDelete} key={value} mb={1} mt={1} ml="xxsmall">
          {value}
        </Chip>
      )
    })

    function handleInputChange(e: FormEvent<HTMLInputElement>) {
      onInputChange(e.currentTarget.value)
    }

    const renderSearchControls = values.length > 0

    return (
      <InputSearch
        searchIcon={
          <SearchControlGrid>
            {validationType === 'error' && (
              <>
                <Icon
                  name="Warning"
                  size={20}
                  color="palette.red500"
                  mr="xxsmall"
                />
                <SearchControlDivider />
              </>
            )}
            {renderSearchControls && (
              <>
                <InputSearchControls
                  onClear={handleClear}
                  showClear={true}
                  disabled={disabled}
                />
                <SearchControlDivider />
              </>
            )}
            <Icon
              name={isVisible ? 'CaretUp' : 'CaretDown'}
              size={18}
              color={disabled ? 'palette.charcoal300' : 'palette.charcoal500'}
              mr="xsmall"
            />
          </SearchControlGrid>
        }
        searchIconPosition="right"
        ref={ref}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        validationType={validationType}
        {...props}
      >
        {chips}
      </InputSearch>
    )
  }
)

InputChipsBaseInternal.displayName = 'InputChipsBaseInternal'

const SearchControlGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ children }) => {
    const childArray = Children.toArray(children)
    switch (childArray.length) {
      case 3:
        return '1fr 1px 1fr 1px 1fr'
      case 2:
        return '1fr 1px 1fr'
      default:
        return '1fr'
    }
  }};
  grid-gap: ${({ theme }) => theme.space.xxsmall};
  align-items: center;
  justify-items: center;
  max-height: 1.9rem;
`

const SearchControlDivider = styled.div`
  background: ${({ theme }) => theme.colors.palette.charcoal200};
  height: 80%;
  width: 100%;
`

export const InputChipsBase = styled(InputChipsBaseInternal)`
  position: relative;
  align-items: stretch;

  ${Flex} {
    flex: 1;
    overflow: auto;
  }

  ${InputText} {
    width: auto;
    min-width: 25%;
    padding-right: 0;
  }
`
