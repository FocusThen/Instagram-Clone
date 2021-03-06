import { firebase } from '@app/lib/firabase'
import type { UserEntity } from '@appTypes/UserEntity'

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
