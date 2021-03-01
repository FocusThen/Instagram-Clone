import * as yup from 'yup'

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .required('This field required!'),
  fullName: yup.string().required('This field required!'),
  email: yup
    .string()
    .email('Email Field must be a valid email')
    .required('This field required!'),
  password: yup
    .string()
    .required('This field required!')
    .min(8, 'Password must be at least 8 characters'),
})
