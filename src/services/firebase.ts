import { firebase, FieldValue } from '@app/lib/firabase'

export async function doesUsernameExist(username: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.map((user) => user.data().length > 0)
}
