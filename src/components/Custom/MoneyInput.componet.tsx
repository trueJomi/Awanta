import { type FilledInputProps, type InputProps, type OutlinedInputProps, TextField } from '@mui/material'
import React from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string, value: string } }) => void
  name: string
}

interface NewInputProps {
  name: string
  errors?: string
  onChange?: (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  label?: string
  type?: React.HTMLInputTypeAttribute
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
  disabled?: boolean
  required?: boolean
  value?: any
  select?: boolean
  children?: any
  defaultValue?: any
  className?: string
  prefix?: string
}

const MoneyInput: React.FC<NewInputProps> = ({
  name,
  errors = undefined,
  label = '',
  className = '',
  type,
  InputProps = {},
  disabled = false,
  onChange,
  required = false,
  value,
  select = false,
  defaultValue,
  prefix = 'S/ ',
  children
}) => {
  const NumericFormatCustom = React.useMemo(() => {
    return React.forwardRef<NumericFormatProps, CustomProps>(
      function NumericFormatCustom (props, ref) {
        const { onChange, ...other } = props
        return (
          <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
              onChange({
                target: {
                  name: props.name,
                  value: values.value
                }
              })
            }}
            isAllowed={(values) => {
              if (values.floatValue !== undefined) {
                return values.floatValue >= 0
              } else { return true }
            }}
            thousandSeparator
            valueIsNumericString
            prefix={prefix}
          />
        )
      }
    )
  }, [prefix])
  return (
    <div>
      <TextField
        defaultValue={defaultValue}
        value={value}
        className={`w-full disabled:bg-slate-100 disabled:dark:bg-gray-700 ${className}`}
        required={required}
        disabled={disabled}
        type={type}
        name={name}
        error={errors !== undefined}
        id={name}
        select={select}
        label={label}
        InputProps={{
          ...InputProps,
          inputComponent: NumericFormatCustom as any
        }}
        onChange={onChange}
        fullWidth
        helperText={errors}
      >
        {children}
      </TextField>
    </div>
  )
}

export default MoneyInput
