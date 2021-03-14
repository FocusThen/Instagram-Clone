import React from 'react'
import UserProfileHeader from '@app/components/UserProfile/UserProfileHeader'
import UserProfilePhotos from '@app/components/UserProfile/UserProfilePhotos'

export type ProfileDetailProps = {
  username: string
}

export default function ProfileDetail({ username }: ProfileDetailProps) {
  return (
    <>
      <UserProfileHeader />
      <UserProfilePhotos />
    </>
  )
}
