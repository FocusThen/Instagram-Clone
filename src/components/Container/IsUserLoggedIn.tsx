import React, { ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'

import type Firebase from 'firebase'

export type IsUserLoggedIn = {
  user?: Firebase.User
  loggedInPath: string
  children: ReactNode
  path: string
}

export default function IsUserLoggedIn({
  user,
  loggedInPath,
  children,
  ...rest
}: IsUserLoggedIn) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children
        }
        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          )
        }
        return null
      }}
    />
  )
}
