import React, { memo, useState, useEffect, FC } from 'react'
import Skeleton from 'react-loading-skeleton'

import { getSuggestedProfiles } from '@app/services/firebase'

export type SidebarSuggestionsProps = {
  userId?: string
}

const SidebarSuggestions: FC<SidebarSuggestionsProps> = ({ userId }) => {
  const [profiles, setProfiles] = useState([])

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
    <p>profiles</p>
  ) : null
}

export default memo(SidebarSuggestions)
