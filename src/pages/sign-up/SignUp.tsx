import { useCallback, useState } from 'react'

function SignUp() {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleFormSubmit = useCallback(
    () => {
      const trimmedEmail = email.trim()
      const trimmedName = name.trim()
      if (!(trimmedEmail && trimmedName)) {
        return null;
      }

      console.log('submit form')
    },
    [
      email,
      name,
    ]
  )

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="Email address"
          type="email"
        />
        <input
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Name"
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
