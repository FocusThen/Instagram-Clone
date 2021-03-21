import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { UserContext } from '@app/context/user'
import * as ROUTES from '@app/constants/routes'

import { useAuthListener } from '@app/hooks/useAuthListener'

import IsUserLoggedIn from '@app/components/Container/IsUserLoggedIn'
import ProtectedRoute from '@app/components/Container/ProtectedRoute'

const Dashboard = lazy(() => import('@app/pages/Dashboard'))
const Login = lazy(() => import('@app/pages/Login'))
const SignUp = lazy(() => import('@app/pages/SignUp'))
const Profile = lazy(() => import('@app/pages/Profile'))
const NotFound = lazy(() => import('@app/pages/NotFound'))

function App() {
  const [user] = useAuthListener()
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
