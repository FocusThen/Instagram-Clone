import React, { memo, useState, useEffect, FC } from 'react'
import Skeleton from 'react-loading-skeleton'

import SuggestionProfile from '@app/components/Suggestions/SuggestionProfile'
import { getSuggestedProfiles } from '@app/services/firebase'

import type { UserEntity } from '@appTypes/UserEntity'

export type SuggestionsProps = {
  userId?: string
}

const Suggestions: FC<SuggestionsProps> = ({ userId }) => {
  const [profiles, setProfiles] = useState<UserEntity[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    function suggestedProfiles() {
      if (userId) {
        setLoading(true)
        getSuggestedProfiles(userId)
          .then((response) => {
            setLoading(false)
            setProfiles(response)
          })
          .catch(() => {
            setLoading(false)
          })
      }
    }
    suggestedProfiles()
  }, [userId])

  return loading ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles ? (
    profiles.length > 0 ? (
      <div className="flex flex-col">
        <div className="flex items-center align-middle justify-between mb-2 mt-2">
          <p className="font-bold text-gray-900 text-sm">Suggestions for you</p>
        </div>
        <div className="grid gap-5 mt-4">
          {profiles.map((profile) => (
            <SuggestionProfile
              key={profile.docId}
              userDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
            />
          ))}
        </div>
      </div>
    ) : null
  ) : null
}

export default memo(Suggestions)
