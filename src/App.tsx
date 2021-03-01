import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from '@app/constants/routes'
const Dashboard = lazy(() => import('@app/pages/Dashboard'))
const Login = lazy(() => import('@app/pages/Login'))
const SignUp = lazy(() => import('@app/pages/SignUp'))
const Profile = lazy(() => import('@app/pages/Profile'))
const NotFound = lazy(() => import('@app/pages/NotFound'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
