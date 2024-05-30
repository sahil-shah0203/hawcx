import React from 'react'

import Button from '../Button'
import './styles.css'

interface ErrorModalProps {
  closeModal: () => void;
}

function ErrorModal(props: ErrorModalProps): React.JSX.Element {
  const { closeModal } = props;

  return (
    <div className="f d-col j-center ai-center background">
      <div className="f d-col j-space-between p-1 ns foreground">
        <div className="t-center error-title">
          WebAuthn error
        </div>
        <div>
          Operation was cancelled or there was an error with WebAuthn authentication!
        </div>
        <Button onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  )
}

export default ErrorModal
