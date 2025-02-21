import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { AuthorizedUser, RegisteredUser } from '../../models'
import Button from '../../components/Button'
import { deleteValue, getValue } from '../../utilities/persistent-store'
import { ROUTES } from '../../constants'
import './styles.css'

function Home(): React.JSX.Element {
  const [user, setUser] = useState<RegisteredUser>()

  const navigate = useNavigate()

  const handleSignOut = () => {
    deleteValue('authorized-user')
    return navigate(ROUTES.index)
  }

  useEffect(
    () => {
      const authorizedUser = getValue<AuthorizedUser>('authorized-user')
      if (!authorizedUser) {
        return navigate(ROUTES.index)
      }
      const registeredUsersArray = getValue<RegisteredUser[]>('users')
      if (!registeredUsersArray) {
        deleteValue('authorized-user')
        return navigate(ROUTES.index)
      }
      const userData = registeredUsersArray.filter(
        (entry) => entry.id === authorizedUser.id
      )
      if (userData.length === 0) {
        deleteValue('authorized-user')
        return navigate(ROUTES.index)
      }
      return setUser(userData[0])
    },
    [navigate]
  )

  return (
    <div className="flex d-col j-center mh-auto page width">
      <div className="flex d-col mh-auto width">
        <div className="page-title ns t-center">
          Home
        </div>
        <div className="subtitle mt-1 ns t-center">
          Account details
        </div>
        <div className="flex j-space-between mt-1 ns">
          <span>
            ID:
          </span>
          <span>
            { user?.id }
          </span>
        </div>
        <div className="flex j-space-between mt-1 ns">
          <span>
            Email:
          </span>
          <span>
            { user?.email }
          </span>
        </div>
        <div className="flex j-space-between mt-1 ns">
          <span>
            Created:
          </span>
          <span>
            { new Date(user?.createdAt || '').toDateString() }
          </span>
        </div>
        <Button
          classes="mt-1"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default Home
