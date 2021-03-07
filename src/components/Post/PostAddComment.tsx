import React, { useState, useContext } from 'react'
import { FirebaseContext } from '@app/context/firebase'
import { UserContext } from '@app/context/user'

export type PostAddCommentProps = {
  docId: string
  comments: {
    comment: string
    displayName: string | null
  }[]
  setComments: (obj: { comment: string; displayName: string | null }[]) => void
  commentInput: React.RefObject<HTMLDivElement>
}

export default function PostAddComment({
  docId,
  comments,
  setComments,
  commentInput,
}: PostAddCommentProps): JSX.Element {
  const [comment, setComment] = useState<string>('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const { user: { displayName = null } = {} } = useContext(UserContext)

  const onSubmit = async (event: any) => {
    event.preventDefault()

    setComments([{ displayName, comment }, ...comments])
    setComment('')
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      })
  }

  return (
    <div className="border-t border-gray-300">
      <p>I will be a form!</p>
    </div>
  )
}
