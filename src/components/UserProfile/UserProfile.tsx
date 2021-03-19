import React, { useEffect } from 'react'

import UserProfileHeader from '@app/components/UserProfile/UserProfileHeader'
import UserProfilePhotos from '@app/components/UserProfile/UserProfilePhotos'

import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '@app/services/firebase'
import { useUserProfileReducer } from '@app/hooks/useUserProfileReducer'

export type ProfileDetailProps = {
  username: string
}

export default function ProfileDetail({ username }: ProfileDetailProps) {
  const [
    { profile, photosCollection, followerCount },
    dispatch,
  ] = useUserProfileReducer()

  console.log(profile, photosCollection, followerCount)

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const [user] = await getUserByUsername(username)
      let photos = await getUserPhotosByUsername(username)
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      })
    }
    getProfileInfoAndPhotos()
  }, [username])

  return (
    <>
      <UserProfileHeader
        photosCollection={photosCollection}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        username={username}
      />
      <UserProfilePhotos
        username={username}
        photosCollection={photosCollection}
      />
    </>
  )
}
