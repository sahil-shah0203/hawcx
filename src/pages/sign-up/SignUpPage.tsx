import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import { getValue, storeValue } from '../../utilities/persistent-store'
import Input from '../../components/Input'
import randomString from '../../utilities/random-string'
import type { RegisteredUser } from '../../models'
import { ROUTES } from '../../constants'
import './styles.css'

function SignUp(): React.JSX.Element {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

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

      const challengePlaintext = `${Date.now()}${randomString(32)}`
      const challenge = new TextEncoder().encode(challengePlaintext)
      console.log(challengePlaintext)
    
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
        console.log('result:\n', result)
        setIsLoading(false)

        const registeredUser: RegisteredUser = {
          challengePlaintext,
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
            registeredUser,
          ]
        )

        return navigate(ROUTES.home, { replace: true })
      } catch (error) {
        setIsLoading(false)
        
        console.log('err:', error, JSON.stringify(error))
      }
    },
    [
      email,
      name,
      navigate
    ]
  )

  return (
    <div className="flex d-col j-center h-100vh">
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
        <Button
          classes="mb-1"
          disabled={!(email.trim() && name.trim()) || isLoading}
          type="submit"
        >
          Sign up
        </Button>
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
