import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '@app/context/firebase'
import * as ROUTES from '@app/constants/routes'
import Button from '../Button/Button'

export default function TheHeader() {
  const { firebase } = useContext(FirebaseContext)
  const user = {
    displayName: 'raphael',
  }

  const signOut = () => {
    firebase.auth().signOut()
  }
  return (
    <header className="h-16 bg-white border-b mb-8">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1>
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-600 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Home">
                  <p>Dashboard</p>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => signOut()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      signOut()
                    }
                  }}
                ></button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} Profile Picture`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} aria-label="Login">
                  <Button type="button" className="text-sm w-20">
                    Log In
                  </Button>
                </Link>
                <Link to={ROUTES.SIGN_UP} aria-label="Sign up">
                  <button
                    type="button"
                    className="font-bold text-sm rounded  w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
