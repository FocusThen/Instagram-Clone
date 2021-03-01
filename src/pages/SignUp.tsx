import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import hookforResolvers from '@hookform/resolvers/yup'
import { SignUpSchema } from '@app/validations/SignUpSchema'

import { FirebaseContext } from '@app/context/firebase'
import * as ROUTES from '@app/constants/routes'
import Input from '@app/components/Input/Input'
import Button from '@app/components/Button/Button'

import { doesUsernameExist } from '@app/services/firebase'

import type { SignUpFormTypes } from '@appTypes/FormEntitys'

export default function SignUp() {
  const history = useHistory()

  const { firebase } = useContext(FirebaseContext)
  // snowpack issue
  // https://github.com/react-hook-form/resolvers/issues/71#issuecomment-770382064
  const yupResolver = hookforResolvers.yupResolver
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
  } = useForm<SignUpFormTypes>({ resolver: yupResolver(SignUpSchema) })
  const { isDirty } = formState

  const [errorMessage, setErrorMessage] = useState<string>()

  const onSubmit = async (values: SignUpFormTypes) => {
    const usernameExist = await doesUsernameExist(values.username)
    if (usernameExist.length) {
      setError('username', {
        type: 'manuel',
        message: 'The Username already exist!',
        shouldFocus: true,
      })
      return
    }

    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)

      await createdUserResult.user?.updateProfile({
        displayName: values.username,
      })

      await firebase.firestore().collection('users').add({
        userId: createdUserResult.user?.uid,
        username: values.username.toLowerCase(),
        fullName: values.fullName,
        emailAddress: values.email.toLowerCase(),
        following: [],
        followers: [],
        dateCreated: Date.now(),
      })

      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      if (error.code.match(/fullName/gi)) {
        setError('fullName', {
          type: 'manuel',
          message: error.message,
          shouldFocus: true,
        })
      }
      if (error.code.match(/username/gi)) {
        setError('username', {
          type: 'manuel',
          message: error.message,
          shouldFocus: true,
        })
      }
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
    document.title = 'Sign Up - Instagram Clone'
  }, [])

  return (
    <div className="bg-gray-50">
      <section className="container flex mx-auto max-w-xs items-center h-screen">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
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
                onKeyUp={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.replace(
                    /\s/g,
                    ''
                  ))
                }
                name="username"
                aria-label="Enter your username"
                type="text"
                placeholder="User name"
                error={!!errors.username}
                errorMessage={errors.username?.message}
              />
              <Input
                ref={register}
                name="fullName"
                aria-label="Enter your Full name"
                type="text"
                placeholder="Full name"
                error={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
              <Input
                ref={register}
                name="email"
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                error={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                ref={register}
                name="password"
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />

              <Button disabled={!isDirty} type="submit">
                Sign Up
              </Button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
            <p className="text-sm">
              Have an account?{' '}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
