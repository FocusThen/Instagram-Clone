import React, { useContext, memo } from 'react'
import type { PhotosEntity } from '@appTypes/PhotosEntity'
import Skeleton from 'react-loading-skeleton'
import { UserContext } from '@app/context/user'
import Post from '@app/components/Post/Post'

export type UserProfilePhotosProps = {
  photosCollection?: PhotosEntity[]
  username: string
}

function UserProfilePhotos({
  photosCollection,
  username,
}: UserProfilePhotosProps) {
  const { user: { uid = '' } = {} } = useContext(UserContext)

  const contents = photosCollection?.map((photos) => ({
    ...photos,
    userLikedPhoto: photos.likes.includes(uid),
    username,
  }))

  return (
    <div className="h-16 border-t border-gray-300 mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photosCollection ? (
          <>
            {[...new Array(9)].map((_: undefined, index: number) => (
              <Skeleton key={index} count={1} width={320} height={400} />
            ))}
          </>
        ) : contents && contents.length > 0 ? (
          contents.map((content) => (
            <div key={content.docId} className="relative group">
              <Post isHeaderVisible={false} content={content} />
            </div>
          ))
        ) : null}
      </div>
      {photosCollection?.length === 0 && (
        <p className="text-center text-2xl">No Photos Yet</p>
      )}
    </div>
  )
}

export default memo(UserProfilePhotos)
