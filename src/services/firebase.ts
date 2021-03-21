import { FieldValue, firebase } from '@app/lib/firabase'
import type { UserEntity } from '@appTypes/UserEntity'
import type { PhotosEntity } from '@appTypes/PhotosEntity'

export async function doesUsernameExist(username: string): Promise<boolean[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUserId(userId: string): Promise<UserEntity[]> {
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

export const getSuggestedProfiles = async (
  userId: string
): Promise<UserEntity[]> => {
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

export async function updateUserFollowing(
  docId: string,
  profileId: string,
  isFollowingProfile: boolean
): Promise<void> {
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

export async function updateFollowedUserFollowers(
  docId: string,
  followingUserId: string,
  isFollowingProfile: boolean
): Promise<void> {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(followingUserId)
        : FieldValue.arrayUnion(followingUserId),
    })
}
export async function getUserByUsername(
  username: string
): Promise<UserEntity[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
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

export async function getUserPhotosByUsername(username: string) {
  const [user] = await getUserByUsername(username)

  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get()

  const photos = result.docs.map((item) => {
    const docId = item.id
    const photos = item.data()
    return {
      ...photos,
      docId,
    } as PhotosEntity
  })

  return photos
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileId: string,
  followingUserId: string
) {
  await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  )
}
