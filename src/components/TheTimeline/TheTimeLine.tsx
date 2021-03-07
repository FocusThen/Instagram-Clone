import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useFollowedUsersPhotos } from '@app/hooks/useFollowedUsersPhotos'
import Post from '@app/components/Post/Post'

export default function TheTimeLine(): JSX.Element {
  const { photos } = useFollowedUsersPhotos()

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  )
}
