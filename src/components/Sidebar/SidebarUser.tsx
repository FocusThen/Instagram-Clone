import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Skelton from 'react-loading-skeleton'
import ProfilePicture from '@app/components/ProfilePicture/ProfilePicture'

export type SidebarUserProps = {
  username?: string
  fullName?: string
}

const SidebarUser: FC<SidebarUserProps> = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skelton count={1} height={61} />
  ) : (
    <div className="grid grid-cols-4 gap-4 mb-4 items-center">
      <div className="flex items-center justify-between col-span-1">
        <ProfilePicture
          username={username}
          className="w-16 mr-3"
          alt="My Profile"
        />
      </div>
      <div className="col-span-3">
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </Link>
      </div>
    </div>
  )
}
export default memo(SidebarUser)
