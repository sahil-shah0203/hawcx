import { useEffect, useState } from 'react'

import './App.css'

export default function App() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [webAuthnIsAvailable, setWebAuthnIsAvailable] = useState<boolean>(false)

  useEffect(
    () => {
      if (typeof(PublicKeyCredential) !== 'undefined') {
        setWebAuthnIsAvailable(true)
      }
      setTimeout(() => setShowSpinner(false), 500)
    },
    [],
  )

  const handleSignIn = () => {
    console.log('sign in')
  }

  const handleSignUp = () => {
    console.log('sign up')
  }

  return (
    <div className="content">
      <h2>
        Browser biometric authentication demo
      </h2>
      { showSpinner && (
        <div>
          Loading...
        </div>
      ) }
      { !showSpinner && (
        <>
          { !webAuthnIsAvailable && (
            <div>
              Your device does not support biometric authentication
            </div>
          ) }
          { webAuthnIsAvailable && (
            <div className="row">
              <button onClick={handleSignIn}>
                Sign in
              </button>
              <button onClick={handleSignUp}>
                Sign up
              </button>
            </div>
          ) }
        </>
      ) }
    </div>
  )
}
