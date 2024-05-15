import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import Input from '../../components/Input'
import randomString from '../../utilities/random-string'
import { ROUTES } from '../../constants'
import './styles.css'

function SignUp(): React.JSX.Element {
  const [email, setEmail] = useState<string>('')
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

      const challenge = new TextEncoder().encode(`${Date.now()}${randomString(32)}`)
      console.log(challenge)
    
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
        return navigate(ROUTES.home, { replace: true })
      } catch (error) {
        console.log(error)
      }
    },
    [
      email,
      name,
      navigate,
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
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Email address"
          type="email"
        />
        <Input
          classes="mb-1"
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Name"
          type="text"
        />
        <Button
          classes="mb-1"
          disabled={!(email.trim() && name.trim())}
          type="submit"
        >
          Sign up
        </Button>
        <div className="flex j-center ns">
          <Link to={ROUTES.index}>
            Back to main page
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp
