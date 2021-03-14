import React from 'react'
import type { useUserProfileReducerEntity } from '@app/hooks/useUserProfileReducer'

export type UserProfileHeaderProps = {
  setFollowerCount: React.Dispatch<useUserProfileReducerEntity>
} & useUserProfileReducerEntity

export default function UserProfileHeader({
  photosCollection,
  profile,
  followerCount,
  setFollowerCount,
}: UserProfileHeaderProps) {
  return <div>UserProfileHeader</div>
}
