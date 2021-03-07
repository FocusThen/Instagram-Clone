import React from 'react'

export type PostFooterProps = {
  caption: string
  username: string
}

export default function PostFooter({
  caption,
  username,
}: PostFooterProps): JSX.Element {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{username}</span>
      <span>{caption}</span>
    </div>
  )
}
