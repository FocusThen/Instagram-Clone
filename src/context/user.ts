import { createContext } from 'react'
import type Firebase from 'firebase'
export const UserContext = createContext<{ user?: Firebase.User }>({} as any)
