import React from 'react'

export type PostImageProps = {
  src: string
  caption: string
}

export default function PostImage({
  src,
  caption,
}: PostImageProps): JSX.Element {
  return (
    <div className="post__img">
      <img src={src} alt={caption} />
    </div>
  )
}
