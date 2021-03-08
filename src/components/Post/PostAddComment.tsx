import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import hookforResolvers from '@hookform/resolvers/yup'
import { PostAddCommentSchema } from '@app/validations/PostAddComment'

import { FirebaseContext } from '@app/context/firebase'
import { UserContext } from '@app/context/user'
import Input from '@app/components/Input/Input'
import Button from '@app/components/Button/Button'

export type PostAddCommentProps = {
  docId: string
  comments: {
    comment: string
    displayName: string | null
  }[]
  setComments: (obj: { comment: string; displayName: string | null }[]) => void
  commentInput: React.MutableRefObject<HTMLInputElement | null>
}

export default function PostAddComment({
  docId,
  comments,
  setComments,
  commentInput,
}: PostAddCommentProps): JSX.Element {
  // snowpack issue
  // https://github.com/react-hook-form/resolvers/issues/71#issuecomment-770382064
  const yupResolver = hookforResolvers.yupResolver
  const { register, handleSubmit, errors, formState, setValue } = useForm<{
    addComment: string
  }>({
    resolver: yupResolver(PostAddCommentSchema),
  })
  const { isDirty } = formState
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const { user: { displayName = null } = {} } = useContext(UserContext)

  const onSubmit = async (values: { addComment: string }) => {
    setComments([{ displayName, comment: values.addComment }, ...comments])
    setValue('addComment', '')
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          displayName,
          comment: values.addComment,
        }),
      })
  }

  return (
    <div className="border-t border-gray">
      <form
        className="flex border-gray-400 pl-0 pr-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-col w-full">
          {errors?.addComment && (
            <span className="text-red-500 text-sm font-medium">
              {errors.addComment?.message}
            </span>
          )}
          <div className="flex justify-between">
            <Input
              ref={(ref) => {
                if (commentInput !== null) commentInput.current = ref
                register(ref)
              }}
              aria-label="Add a comment"
              autoComplete="off"
              className="text-gray-500 mr-3"
              type="text"
              name="addComment"
              placeholder="Add a comment..."
              error={!!errors.addComment}
            />
            <Button
              defaultClasses={false}
              className="text-sm font-bold text-blue-500"
              type="submit"
              disabled={!isDirty}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
