import Firebase from 'firebase'

const {
  SNOWPACK_PUBLIC_apiKey,
  SNOWPACK_PUBLIC_authDomain,
  SNOWPACK_PUBLIC_projectId,
  SNOWPACK_PUBLIC_storageBucket,
  SNOWPACK_PUBLIC_messagingSenderId,
  SNOWPACK_PUBLIC_appId,
} = import.meta.env

const config = {
  apiKey: SNOWPACK_PUBLIC_apiKey,
  authDomain: SNOWPACK_PUBLIC_authDomain,
  projectId: SNOWPACK_PUBLIC_projectId,
  storageBucket: SNOWPACK_PUBLIC_storageBucket,
  messagingSenderId: SNOWPACK_PUBLIC_messagingSenderId,
  appId: SNOWPACK_PUBLIC_appId,
}

export const firebase = Firebase.initializeApp(config)
