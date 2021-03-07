import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@app/context/user'
import { getUserByUserId, getUserFollowPhotos } from '@app/services/firebase'
import type { UserFollowPhotosEntity } from '@appTypes/UserFollowPhotosEntity'

export const useFollowedUsersPhotos = () => {
  const { user: { uid: userId = '' } = {} } = useContext(UserContext)
  const [photos, setPhotos] = useState<UserFollowPhotosEntity[]>()

  useEffect(() => {
    async function getTimeLinePhotos() {
      if (userId) {
        const followingUserIds = await getUserByUserId(userId)

        if (followingUserIds && followingUserIds[0].following.length > 0) {
          const followedUserPhotos = await getUserFollowPhotos(
            userId,
            followingUserIds[0].following
          )

          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
          setPhotos(followedUserPhotos)
        }
      }
    }
    getTimeLinePhotos()
  }, [userId])

  return { photos }
}
