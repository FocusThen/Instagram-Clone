import React, { useRef } from 'react'

import PostHeader from '@app/components/Post/PostHeader'
import PostFooter from '@app/components/Post/PostFooter'
import PostImage from '@app/components/Post/PostImage'
import PostActions from '@app/components/Post/PostActions'
import PostAddComment from '@app/components/Post/PostAddComment'

import type { UserFollowPhotosEntity } from '@appTypes/UserFollowPhotosEntity'

export default function Post({
  content,
}: {
  content: UserFollowPhotosEntity
}): JSX.Element {
  const commentInput = useRef<HTMLDivElement>(null)

  const handleFocus = () => commentInput.current && commentInput.current.focus()

  return (
    <div className="rounded col-span-4 border bg-white mb-16">
      <PostImage src={content.imageSrc} caption={content.caption} />
      <PostFooter username={content.username} caption={content.caption} />
      <PostActions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
    </div>
  )
}
