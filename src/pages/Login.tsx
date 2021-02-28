import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '@app/constants/routes'
import { useForm } from 'react-hook-form'
import hookforResolvers from '@hookform/resolvers/yup'
import { LoginSchema } from '@app/validations/LoginSchema'

import Input from '@app/components/Input/Input'
import Button from '@app/components/Button/Button'

export default function Login() {
  // snowpack issue
  // https://github.com/react-hook-form/resolvers/issues/71#issuecomment-770382064
  const yupResolver = hookforResolvers.yupResolver
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(LoginSchema),
  })
  const { isDirty } = formState

  useEffect(() => {
    document.title = 'Login - Instagram Clone'
  }, [])

  const onSubmit = (values: { username: string; password: string }) => {
    console.log(values)
  }

  return (
    <div className="bg-gray-50">
      <section className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-3/5">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="Phone"
            height="500"
            width="500"
          />
        </div>
        <div className="flex flex-col w-2/5 space-y-4">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
            <h1 className="flex justify-center w-full">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className="mt-2 mb-4 w-6/12"
              />
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
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
