import React from 'react'

import './styles.css'

function Footer(): React.JSX.Element {
  return (
    <div className="f f-wrap j-center ai-center ph-1 ns footer">
      <span>
        <a
          href="https://github.com/sahil-shah0203/hawcx"
          target="_blank"
        >
          WebAuthn demo
        </a>
      </span>
      <span className="ml-half">
        by
      </span>
      <span className="ml-half">
        <a
          href="https://github.com/sahil-shah0203"
          target="_blank"
        >
          Sahil Shah
        </a>
      </span>
    </div>
  )
}

export default Footer
