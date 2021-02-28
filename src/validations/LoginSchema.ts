import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email Field must be a valid email')
    .required('This field required!'),
  password: yup
    .string()
    .required('This field required!')
    .min(8, 'Password must be at least 8 characters'),
})
