import type { PhotosEntity } from '@appTypes/PhotosEntity'

export interface UserFollowPhotosEntity extends PhotosEntity {
  userLikedPhoto: boolean
  username: string
}
