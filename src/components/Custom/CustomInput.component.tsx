import { type FilledInputProps, type InputProps, type OutlinedInputProps, TextField } from '@mui/material'
import React from 'react'

interface NewInputProps {
  name: string
  errors?: string
  onChange?: (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  label?: string
  type: React.HTMLInputTypeAttribute
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
  disabled?: boolean
  required?: boolean
  value?: any
  select?: boolean
  children?: any
  defaultValue?: any
  className?: string
}

const CustomInput: React.FC<NewInputProps> = ({
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
  children
}) => {
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
        InputProps={InputProps}
        onChange={onChange}
        fullWidth
        helperText={errors}
      >
        {children}
      </TextField>
    </div>
  )
}

export default CustomInput
