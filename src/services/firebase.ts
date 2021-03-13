import { FieldValue, firebase } from '@app/lib/firabase'
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

export const getSuggestedProfiles = async (userId: string) => {
  const result = await firebase.firestore().collection('users').limit(10).get()

  const [{ following }] = await getUserByUserId(userId)

  return result.docs
    .map((user) => {
      const docId = user.id
      const users = user.data()
      return { ...users, docId } as UserEntity
    })
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    )
}

export const updateUserFollowing = async (
  docId: string,
  profileId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
}

export const updateFollowedUserFollowers = async (
  docId: string,
  followingUserId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(followingUserId)
        : FieldValue.arrayUnion(followingUserId),
    })
}
