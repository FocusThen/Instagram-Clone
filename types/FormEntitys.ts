export interface LoginFormTypes {
  email: string
  password: string
}

export interface SignUpFormTypes extends LoginFormTypes {
  username: string
  fullName: string
}
