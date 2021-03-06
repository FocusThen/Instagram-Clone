import { useState, useEffect, useContext } from 'react'
import type { UserEntity } from '@appTypes/UserEntity'
import { getUserByUserId } from '@app/services/firebase'
import { UserContext } from '@app/context/user'

export const useUser = () => {
  const [activeUser, setActiveUser] = useState<UserEntity>()
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      if (user && user.uid) {
        const [response] = await getUserByUserId(user.uid)
        setActiveUser({ ...response })
      }
    }
    getUserObjByUserId()
  }, [user])

  return { user: activeUser }
}
