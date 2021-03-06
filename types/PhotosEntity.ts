export interface PhotosEntity {
  caption: string
  comments: {
    comment: string
    displayName: string
  }[]
  dateCreated: number
  imageSrc: string
  likes: string[]
  photoId: number
  userId: string
  userLatitude: string
  userLongitude: string
  docId: string
}
