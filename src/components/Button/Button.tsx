import React from 'react'

type ButtonType = 'button' | 'submit'

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
}

function Button(props: React.PropsWithChildren<ButtonProps>): React.JSX.Element {
  const {
    children,
    disabled = false,
    onClick = null,
    type = 'button'
  } = props

  return (
    <button
      className="button ns"
      disabled={disabled}
      onClick={onClick || (() => null)}
      type={type}
    >
      { children }
    </button>
  )
}

export default Button
