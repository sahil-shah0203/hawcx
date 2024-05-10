import React from 'react'

import './styles.css'

type ButtonType = 'button' | 'submit'

interface ButtonProps {
  classes?: string;
  disabled?: boolean;
  isLink?: boolean;
  onClick?: () => void;
  type?: ButtonType;
}

function Button(props: React.PropsWithChildren<ButtonProps>): React.JSX.Element {
  const {
    children,
    classes = '',
    disabled = false,
    isLink = false,
    onClick = null,
    type = 'button'
  } = props

  return (
    <button
      className={`${isLink ? 'link' : 'button'} ns${classes ? ` ${classes}` : ''}`}
      disabled={disabled}
      onClick={onClick || (() => null)}
      type={type}
    >
      { children }
    </button>
  )
}

export default Button
