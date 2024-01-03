import { type FilledInputProps, type InputProps, type OutlinedInputProps, TextField } from '@mui/material'
import React from 'react'

interface NewInputProps {
  name: string
  errors?: string
  change: (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  label?: string
  type: React.HTMLInputTypeAttribute
  inputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
  disabled?: boolean
  required?: boolean
  value?: any
  select?: boolean
  children?: any
  valueDefault?: any
  className?: string
}

const CustomInput: React.FC<NewInputProps> = ({
  name,
  errors = undefined,
  label = '',
  className = '',
  type,
  inputProps = {},
  disabled = false,
  change,
  required = false,
  value,
  select = false,
  valueDefault,
  children
}) => {
  return (
    <div>
      <TextField
        defaultValue={valueDefault}
        value={value}
        className={`w-full disabled:bg-slate-100 disabled:dark:bg-gray-700 ${className}`}
        required={required}
        disabled={disabled}
        type={type}
        error={errors !== undefined}
        id={name}
        select={select}
        label={label}
        InputProps={inputProps}
        onChange={change}
        fullWidth
        helperText={errors}
      >
        {children}
      </TextField>
    </div>
  )
}

export default CustomInput
