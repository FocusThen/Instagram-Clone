import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import * as ROUTES from '@app/constants/routes'

import TheHeader from '@app/components/TheHeader/TheHeader'
import UserProfile from '@app/components/UserProfile/UserProfile'

import { getUserByUsername } from '@app/services/firebase'

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const history = useHistory()

  const [userExists, setUserExists] = useState<boolean>()

  useEffect(() => {
    async function checkUserExistsToLoadProfile() {
      const user = await getUserByUsername(username)
      if (!(user.length > 0)) {
        history.push(ROUTES.NOT_FOUND)
      } else {
        setUserExists(true)
      }
    }
    checkUserExistsToLoadProfile()
  }, [username, history])

  return userExists ? (
    <div className="bg-gray-50">
      <TheHeader />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile username={username} />
      </div>
    </div>
  ) : null
}
