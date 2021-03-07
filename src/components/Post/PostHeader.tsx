import React from 'react'

import { Link } from 'react-router-dom'

export type PostHeaderProps = {
  username: string
}

export default function PostHeader({ username }: PostHeaderProps): JSX.Element {
  return (
    <div className="flex border-b h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/assets/images/avatars/${username}.jpg`}
            alt={`${username} Profile Picture`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  )
}
