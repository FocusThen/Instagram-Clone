import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '@app/constants/routes'
import { useForm } from 'react-hook-form'
import hookforResolvers from '@hookform/resolvers/yup'
import { LoginSchema } from '@app/validations/LoginSchema'

import { FirebaseContext } from '@app/context/firebase'
import Input from '@app/components/Input/Input'
import Button from '@app/components/Button/Button'

import type { LoginFormTypes } from '@appTypes/FormEntitys'

export default function Login() {
  const history = useHistory()

  const { firebase } = useContext(FirebaseContext)

  // snowpack issue
  // https://github.com/react-hook-form/resolvers/issues/71#issuecomment-770382064
  const yupResolver = hookforResolvers.yupResolver
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
  } = useForm<LoginFormTypes>({
    resolver: yupResolver(LoginSchema),
  })
  const { isDirty } = formState

  const [errorMessage, setErrorMessage] = useState<string>()
  const onSubmit = async (values: LoginFormTypes) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      if (error.code.match(/email/gi)) {
        setError('email', {
          type: 'manuel',
          message: error.message,
          shouldFocus: true,
        })
      }
      if (error.code.match(/password/gi)) {
        setError('password', {
          type: 'manuel',
          message: error.message,
          shouldFocus: true,
        })
      }
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Login - Instagram Clone'
  }, [])

  return (
    <div className="bg-gray-50">
      <section className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            src="/assets/images/iphone-with-profile.jpg"
            alt="Phone"
            height="500"
            width="500"
          />
        </div>
        <div className="flex flex-col w-2/5 space-y-2">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
            <h1 className="flex justify-center w-full">
              <img
                src="/assets/images/logo.png"
                alt="Instagram"
                className="mt-2 mb-4 w-6/12"
              />
            </h1>

            {errorMessage && (
              <p className="mb-4 text-xs text-red-500">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                ref={register}
                className="mr-3 mb-2"
                name="email"
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                ref={register}
                className="mr-3 mb-2"
                name="password"
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />

              <Button disabled={!isDirty} type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
            <p className="text-sm">
              Don't have and account?{' '}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
