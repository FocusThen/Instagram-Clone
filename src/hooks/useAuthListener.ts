import { useState, useEffect, useContext } from 'react'
import type Firebase from 'firebase'
import { FirebaseContext } from '@app/context/firebase'

export const useAuthListener = () => {
  const [user, setUser] = useState<Firebase.User>()
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const authUser = localStorage.getItem('authUser')
    if (authUser) {
      const savedUser: Firebase.User = JSON.parse(authUser)
      setUser(savedUser)
    }
  }, [])

  useEffect(() => {
    if (firebase) {
      const listener = firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          setUser(authUser)
        } else {
          localStorage.removeItem('authUser')
          setUser(undefined as any)
        }
      })
      return () => listener()
    }
  }, [firebase])

  return [user]
}
