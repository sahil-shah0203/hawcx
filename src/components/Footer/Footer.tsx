import React from 'react'

import './styles.css'

function Footer(): React.JSX.Element {
  const year = new Date().getFullYear()

  return (
    <div className="flex j-center ai-center ns footer">
      <span>
        <a
          href="https://github.com/peterdee/webauthn-demo"
          target="_blank"
        >
          WebAuthn demo
        </a>
      </span>
      <span className="ml-1">
        ©
      </span>
      <span className="ml-1">
        { year }
      </span>
    </div>
  )
}

export default Footer
