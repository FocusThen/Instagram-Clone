import React, { useState } from 'react'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'

import PostAddComment from '@app/components/Post/PostAddComment'

export type PostCommentsProps = {
  docId: string
  comments: {
    comment: string
    displayName: string | null
  }[]
  posted: number
  commentInput: React.MutableRefObject<HTMLInputElement | null>
}

export default function PostComments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}: PostCommentsProps) {
  const [comments, setComments] = useState(allComments)

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-500 mb-1 cursor-pointer">
            View All {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-500 text-xs mt-2">
          {formatDistance(posted, new Date())} age
        </p>
      </div>
      <PostAddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  )
}
