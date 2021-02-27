import { createContext } from 'react'
import type Firebase from 'firebase'
import type { FieldValue } from '@app/lib/firabase'

export const FirebaseContext = createContext<{
  firebase: Firebase.app.App
  // if i do Firebase.firestore.FieldValue giving this error
  // Property 'isEqual' is missing in type 'typeof FieldValue' but required in type 'FieldValue'.
  FieldValue: typeof FieldValue
}>({} as any)
