import React, { memo, useState, useEffect, FC } from 'react'
import Skeleton from 'react-loading-skeleton'

import SuggestionProfile from '@app/components/Suggestions/SuggestionProfile'
import { getSuggestedProfiles } from '@app/services/firebase'

import type { UserEntity } from '@appTypes/UserEntity'

export type SuggestionsProps = {
  userId?: string
}

const Suggestions: FC<SuggestionsProps> = ({ userId }) => {
  const [profiles, setProfiles] = useState<UserEntity[]>([
    {
      docId: '1',
      username: 'Dali',
      userId: '3',
      dateCreated: 1,
      followers: [],
      following: [],
      fullName: '',
    },
  ])

  useEffect(() => {
    async function suggestedProfiles() {
      if (userId) {
        // const response = await getSuggestedProfiles(userId)
        // setProfiles(response)
      }
    }
    // suggestedProfiles()
  }, [userId])

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="grid">
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
  ) : null
}

export default memo(Suggestions)
