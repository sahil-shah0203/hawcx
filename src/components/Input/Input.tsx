import React from 'react'

import './styles.css'

type InputType = 'email' | 'number' | 'text'

interface InputProps {
  name?: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: object;
  type?: InputType;
}

function Input(props: InputProps): React.JSX.Element {
  const {
    name,
    onChange,
    placeholder,
    styles = {},
    type = 'text'
  } = props

  return (
    <input
      className="input"
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      style={styles}
      type={type}
    />
  )
}

export default Input