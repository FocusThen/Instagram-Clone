import React from 'react'
import { useUser } from '@app/hooks/useUser'

export default function TheSidebar() {
  const {
    user: { docId, userId, following, username, fullName } = {},
  } = useUser()
  return <div></div>
}
