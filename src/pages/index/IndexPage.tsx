import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import randomString from '../../utilities/random-string'
import { ROUTES } from '../../constants'
import Spinner from '../../components/Spinner'
import './styles.css'

function Index(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [webAuthnIsAvailable, setWebAuthnIsAvailable] = useState<boolean>(false)

  const challenge = new TextEncoder().encode(`${Date.now()}${randomString(32)}`)

  const navigate = useNavigate()

  useEffect(
    () => {
      if (navigator.credentials && typeof(PublicKeyCredential) !== 'undefined') {
        setWebAuthnIsAvailable(true)
      }
      setTimeout(() => setIsLoading(false), 500)
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
      return navigate(ROUTES.home)
    } catch (error) {
      const typedError = error as Error;
      console.log('err:', error, typeof error, JSON.stringify(error), typedError.message)
    }
  }

  return (
    <div className="flex d-col j-center mh-auto page width">
      <div className="flex d-col mh-auto width content">
        <div className="page-title ns t-center">
          WebAuthn
        </div>
        { isLoading && (
          <div className="f j-center mt-2">
            <Spinner />
          </div>
        ) }
        { !isLoading && (
          <>
            { !webAuthnIsAvailable && (
              <div className="not-supported ns t-center mt-2">
                Your device does not support biometric authentication!
              </div>
            ) }
            { webAuthnIsAvailable && (
              <>
                <Button
                  classes="mt-2"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
                <Button
                  classes="mt-1"
                  onClick={() => navigate(ROUTES.signUp)}
                >
                  Sign up
                </Button>
              </>
            ) }
          </>
        ) }
      </div>
    </div>
  )
}

export default Index
