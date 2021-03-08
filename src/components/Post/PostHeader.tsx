import React from 'react'

import ProfilePicture from '@app/components/ProfilePicture/ProfilePicture'

export type PostHeaderProps = {
  username: string
}

export default function PostHeader({ username }: PostHeaderProps): JSX.Element {
  return (
    <div className="flex border-b h-4 p-4 py-8">
      <div className="flex items-center">
        <ProfilePicture
          username={username}
          className="h-8 w-8 mr-3"
          alt={`${username} Profile Picture`}
        />
        <p className="font-bold">{username}</p>
      </div>
    </div>
  )
}
