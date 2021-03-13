import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfilePicture from '../ProfilePicture/ProfilePicture'

export type SuggestionProfileProps = {
  userDocId: string
  username: string
  profileId: string
  userId: string
}

export default function SuggestionProfile({
  userDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState<boolean>(false)

  async function handleFollowUser() {
    setFollowed(true)
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <ProfilePicture
          username={username}
          alt={`Follow ${username}`}
          className="w-8 mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div className="flex">
        <button
          className="text-sm font-bold text-blue-500"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null
}
