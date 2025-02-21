import React from 'react'

type InputType = 'email' | 'number' | 'text'

interface InputProps {
  classes?: string;
  disabled?: boolean;
  name?: string;
  value?: string; // <-- Add this line
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: object;
  type?: InputType;
}

function Input(props: InputProps): React.JSX.Element {
  const {
    classes = '',
    disabled = false,
    name = '',
    value = '',  // default value if needed
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
      value={value} // <-- Use the value prop here
      onChange={onChange}
      placeholder={placeholder}
      style={styles}
      type={type}
    />
  )
}

export default Input
