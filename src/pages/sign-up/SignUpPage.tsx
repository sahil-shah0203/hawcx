import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { AuthorizedUser, RegisteredUser } from '../../models'
import Button from '../../components/Button'
import createChallenge from '../../utilities/challenge'
import ErrorModal from '../../components/ErrorModal'
import { getValue, storeValue } from '../../utilities/persistent-store'
import Input from '../../components/Input'
import randomString from '../../utilities/random-string'
import { ROUTES } from '../../constants'
import Spinner from '../../components/Spinner'
import './styles.css'

function SignUp(): React.JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const trimmedEmail = email.trim()
      const trimmedName = name.trim()
      if (!(trimmedEmail && trimmedName)) {
        return null;
      }

      setIsLoading(true)

      const { encoded: challenge, plaintext } = createChallenge()
    
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
          displayName: name,
          id: new TextEncoder().encode(randomString(32)),
          name: email
        }
      }
  
      try {
        const result = await navigator.credentials.create({ publicKey: options })
        setIsLoading(false)

        const registeredUser: RegisteredUser = {
          challengePlaintext: plaintext,
          createdAt: Date.now(),
          email: trimmedEmail,
          id: result?.id || '',
          name: trimmedName,
        }
        const existingUsers = getValue<RegisteredUser[]>('users') || []
        storeValue<RegisteredUser[]>(
          'users',
          [
            ...existingUsers,
            registeredUser
          ]
        )
        storeValue<AuthorizedUser>(
          'authorized-user',
          {
            id: result?.id || '',
            isAuthorized: true
          }
        )

        return navigate(ROUTES.home, { replace: true })
      } catch (error) {
        setIsLoading(false)
        return setShowErrorModal(true)
      }
    },
    [
      email,
      name,
      navigate
    ]
  )

  return (
    <div className="flex d-col j-center mh-auto page width">
      { showErrorModal && (
        <ErrorModal
          closeModal={() => setShowErrorModal(false)}
        />
      ) }
      <div className="t-center mb-1 ns page-title">
        Sign up
      </div>
      <form
        className="flex d-col mh-auto auth-form"
        onSubmit={handleFormSubmit}
      >
        <Input
          classes="mb-1"
          disabled={isLoading}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Email address"
          type="email"
        />
        <Input
          classes="mb-1"
          disabled={isLoading}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Name"
          type="text"
        />
        { isLoading && (
          <div className="f j-center">
            <Spinner />
          </div>
        ) }
        { !isLoading && (
          <Button
            classes="mb-1"
            disabled={!(email.trim() && name.trim()) || isLoading}
            type="submit"
          >
            Sign up
          </Button>
        ) }
        <div className="flex j-center ns">
          <Button
            disabled={isLoading}
            isLink={true}
            onClick={() => navigate(ROUTES.index)}
          >
            Back to main page
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp
