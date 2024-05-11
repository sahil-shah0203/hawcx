import { useEffect, useState } from 'react'

import randomString from './utilities/random-string'

import './App.css'

export default function App() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [webAuthnIsAvailable, setWebAuthnIsAvailable] = useState<boolean>(false)

  const challenge = new TextEncoder().encode(`${Date.now()}${randomString(32)}`)

  useEffect(
    () => {
      if (navigator.credentials && typeof(PublicKeyCredential) !== 'undefined') {
        setWebAuthnIsAvailable(true)
      }
      setTimeout(() => setShowSpinner(false), 500)
    },
    [],
  )

  const handleSignIn = async () => {
    console.log('sign in')

    const abortController = new AbortController()
    try {
      const result = await navigator.credentials.get({
        mediation: 'silent',
        publicKey: {
          challenge,
        },
        signal: abortController.signal,
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignUp = async () => {
    console.log('sign up')

    const options: PublicKeyCredentialCreationOptions = {
      challenge,
      pubKeyCredParams: [{
        alg: -7,
        type: 'public-key'
      }],
      rp: {
        name: 'WebAuthn demo'
      },
      user: {
        displayName: 'Test user',
        id: new TextEncoder().encode(randomString(32)),
        name: 'test@email.com'
      }
    }

    const abortController = new AbortController()
    try {
      const result = await navigator.credentials.create({
        publicKey: options,
        signal: abortController.signal,
      })
  
      console.log(result)
    } catch (error) {
      abortController.abort()
      console.log(error)
    }
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
