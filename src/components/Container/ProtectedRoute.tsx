import React, { ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'

import * as ROUTES from '@app/constants/routes'

import type Firebase from 'firebase'

// maybe can be use Router-dom types

export type ProtectedRoute = {
  user?: Firebase.User
  children: ReactNode
  path: string
  exact?: boolean
}

export default function ProtectedRoute({
  user,
  children,
  ...rest
}: ProtectedRoute) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          )
        }

        return null
      }}
    />
  )
}
