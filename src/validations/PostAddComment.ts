import * as yup from 'yup'

export const PostAddCommentSchema = yup.object().shape({
  addComment: yup.string().required('This field required!'),
})
