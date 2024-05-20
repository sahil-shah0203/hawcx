import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { AuthorizedUser } from '../../models'
import Button from '../../components/Button'
import createChallenge from '../../utilities/challenge'
import { getValue, storeValue } from '../../utilities/persistent-store'
import isMobile from '../../utilities/is-mobile'
import { ROUTES } from '../../constants'
import Spinner from '../../components/Spinner'
import './styles.css'

function Index(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [mobile, setMobile] = useState<boolean>(false)
  const [webAuthnIsAvailable, setWebAuthnIsAvailable] = useState<boolean>(false)

  const { encoded: challenge } = createChallenge()

  const navigate = useNavigate()

  const handleSignIn = async () => {
    console.log('sign in')

    try {
      const result = await navigator.credentials.get({
        mediation: 'silent',
        publicKey: { challenge }
      })

      storeValue<AuthorizedUser>('authorized-user', {
        id: result?.id || '',
        isAuthorized: true,
      })
      return navigate(ROUTES.home)
    } catch (error) {
      const typedError = error as Error;
      console.log('err:', error, typeof error, JSON.stringify(error), typedError.message)
    }
  }

  useEffect(
    () => {
      if (navigator.credentials && typeof(PublicKeyCredential) !== 'undefined') {
        setWebAuthnIsAvailable(true)
      }

      if (isMobile()) {
        setMobile(true)
      }

      setTimeout(() => setIsLoading(false), 500)

      if (getValue<AuthorizedUser>('authorized-user')) {
        return navigate(ROUTES.home)
      }
    },
    [navigate],
  )

  return (
    <div className={`flex d-col j-center mh-auto page${mobile ? '-mobile' : ''} width`}>
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
