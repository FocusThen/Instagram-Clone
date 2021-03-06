import { firebase } from '@app/lib/firabase'
import type { UserEntity } from '@appTypes/UserEntity'
import type { PhotosEntity } from '@appTypes/PhotosEntity'

export async function doesUsernameExist(username: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUserId(userId: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const user = result.docs.map((item) => {
    const docId = item.id
    const user = item.data()
    return {
      ...user,
      docId,
    } as UserEntity
  })

  return user
}

export async function getUserFollowPhotos(
  userId: string,
  followingUserIds: string[]
) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followingUserIds)
    .get()

  const userFollowedPhotos = result.docs.map((item) => {
    const docId = item.id
    const photos = item.data()
    return {
      ...photos,
      docId,
    } as PhotosEntity
  })

  const photosWithUserDetail = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }
      const user = await getUserByUserId(photo.userId)
      const username = user[0].username
      return { username, ...photo, userLikedPhoto }
    })
  )

  return photosWithUserDetail
}
