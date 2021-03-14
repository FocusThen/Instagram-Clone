import { useReducer } from 'react'
import type { UserEntity } from '@appTypes/UserEntity'
import type { PhotosEntity } from '@appTypes/PhotosEntity'

export type useUserProfileReducerEntity = {
  profile: UserEntity
  photosCollection: PhotosEntity[]
  followerCount: number
}

const reducer = (
  state: useUserProfileReducerEntity,
  newState: useUserProfileReducerEntity
) => ({ ...state, ...newState })

export const useUserProfileReducer = () => {
  const information = useReducer(reducer, {} as any)
  return information
}
