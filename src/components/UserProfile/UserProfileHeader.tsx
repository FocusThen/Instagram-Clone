import React, { useState } from 'react'

import { useUser } from '@app/hooks/useUser'
import ProfilePicture from '@app/components/ProfilePicture/ProfilePicture'
import Button from '@app/components/Button/Button'

import type { useUserProfileReducerEntity } from '@app/hooks/useUserProfileReducer'
export type UserProfileHeaderProps = {
  username: string
  setFollowerCount: React.Dispatch<useUserProfileReducerEntity>
} & useUserProfileReducerEntity

export default function UserProfileHeader({
  photosCollection,
  profile,
  followerCount,
  setFollowerCount,
  username,
}: UserProfileHeaderProps) {
  const { user } = useUser()
  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean>(false)
  const activeBtnFollowState = user?.username && user.username !== username

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <ProfilePicture username={username} className="h-40 w-40" />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {activeBtnFollowState && (
            <Button
              type="button"
              className="w-20"
              onClick={() => console.log('I am a button')}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
