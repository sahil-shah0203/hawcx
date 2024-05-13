import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import randomString from '../../utilities/random-string'

import './styles.css'

export default function App() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [webAuthnIsAvailable, setWebAuthnIsAvailable] = useState<boolean>(false)

  const challenge = new TextEncoder().encode(`${Date.now()}${randomString(32)}`)

  const navigate = useNavigate()

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

    try {
      const result = await navigator.credentials.get({
        mediation: 'silent',
        publicKey: {
          challenge,
        },
      })
      console.log(result)
    } catch (error) {
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
              Your device does not support biometric authentication!
            </div>
          ) }
          { webAuthnIsAvailable && (
            <div className="row">
              <button onClick={handleSignIn}>
                Sign in
              </button>
              <button onClick={() => navigate('/sign-up')}>
                Sign up
              </button>
            </div>
          ) }
        </>
      ) }
    </div>
  )
}
