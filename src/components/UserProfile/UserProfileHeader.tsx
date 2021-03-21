import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useUser } from '@app/hooks/useUser'
import ProfilePicture from '@app/components/ProfilePicture/ProfilePicture'
import Button from '@app/components/Button/Button'

import type { useUserProfileReducerEntity } from '@app/hooks/useUserProfileReducer'
export type UserProfileHeaderProps = {
  username: string
  dispatch: React.Dispatch<useUserProfileReducerEntity>
} & useUserProfileReducerEntity

export default function UserProfileHeader({
  photosCollection,
  profile,
  followerCount = 0,
  dispatch: setFollowerCount,
  username,
}: UserProfileHeaderProps) {
  const { user } = useUser()
  const [isFollowingProfile, setIsFollowingProfile] = useState<boolean>(false)

  const activeBtnFollowState = user?.username && user.username !== username
  const photosCount = photosCollection ? photosCollection.length : 0

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
    setFollowerCount({
      profile,
      photosCollection,
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    })
  }

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
              onClick={() => handleToggleFollow()}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
        <div className="container flex mt-4">
          {!profile?.following || !followerCount ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>{' '}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile?.following.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile?.fullName ? (
              <Skeleton count={1} height={24} />
            ) : (
              profile.fullName
            )}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  )
}
