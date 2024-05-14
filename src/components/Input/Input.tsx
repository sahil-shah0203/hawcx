import React from 'react'

type InputType = 'email' | 'number' | 'text'

interface InputProps {
  classes?: string;
  disabled?: boolean;
  name?: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: object;
  type?: InputType;
}

function Input(props: InputProps): React.JSX.Element {
  const {
    classes = '',
    disabled = false,
    name = '',
    onChange,
    placeholder = '',
    styles = {},
    type = 'text'
  } = props

  return (
    <input
      className={`input styled-input${classes ? ` ${classes}` : ''}`}
      disabled={disabled}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      style={styles}
      type={type}
    />
  )
}

export default Input
