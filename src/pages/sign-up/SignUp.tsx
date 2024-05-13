import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input'
import randomString from '../../utilities/random-string'
import { ROUTES, UNIT } from '../../constants'

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
        return navigate(ROUTES.index, { replace: true })
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
    <div>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Input
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Email address"
          styles={{
            marginBottom: UNIT,
          }}
          type="email"
        />
        <Input
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Name"
          styles={{
            marginBottom: UNIT,
          }}
          type="text"
        />
        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp
