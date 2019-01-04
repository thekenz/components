import * as React from 'react'
import { Theme, withTheme } from '../../../../style'
import { CustomizableAttributes } from '../../../../types/attributes'
import { Box, BoxProps } from '../../../Box'
import { InputProps } from '../InputProps'

export interface InputTextProps extends BoxProps<HTMLInputElement>, InputProps {
  /**
   * Specifies value of the input field.
   */
  value?: string
  /**
   * Displays an example value or short hint to the user. Should not replace a label.
   */
  placeholder?: string
  theme?: Theme
}

const InternalInputText: React.SFC<InputTextProps> = ({
  validationType,
  ...props
}) => {
  const handleValidationType = () => {
    switch (validationType) {
      case 'error':
        return 'palette.red000'
      default:
        return undefined
    }
  }
  return (
    <Box
      is="input"
      bg={handleValidationType()}
      border="solid 1px"
      borderColor="palette.charcoal300"
      borderRadius={CustomizableInputTextAttributes.borderRadius}
      fontSize={CustomizableInputTextAttributes.fontSize}
      height={CustomizableInputTextAttributes.height}
      px={CustomizableInputTextAttributes.px}
      py={CustomizableInputTextAttributes.py}
      type="text"
      {...props}
    />
  )
}

export const InputText = withTheme(InternalInputText)

export const CustomizableInputTextAttributes: CustomizableAttributes = {
  borderRadius: 'medium',
  fontSize: 'small',
  height: '28px',
  px: 'xsmall',
  py: 'none',
}
