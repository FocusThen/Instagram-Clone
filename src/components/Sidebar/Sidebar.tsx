import React from 'react'
import { useUser } from '@app/hooks/useUser'
import SidebarUser from '@app/components/Sidebar/SidebarUser'
import SidebarSuggestions from '@app/components/Sidebar/SidebarSuggestions'

export default function Sidebar() {
  const {
    user: { docId, userId, following, username, fullName } = {},
  } = useUser()
  return (
    <div>
      <SidebarUser username={username} fullName={fullName} />
      <SidebarSuggestions userId={userId} />
    </div>
  )
}
