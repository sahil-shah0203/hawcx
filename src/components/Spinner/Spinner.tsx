import React from 'react'

import './styles.css'

function Spinner(): React.JSX.Element {
  return (
    <div className="flex j-center">
      <span className="loader" />
    </div>
  )
}

export default Spinner
