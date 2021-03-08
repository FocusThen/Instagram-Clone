import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Skelton from 'react-loading-skeleton'

export type SidebarUserProps = {
  username?: string
  fullName?: string
}

const SidebarUser: FC<SidebarUserProps> = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skelton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-4 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/assets/images/avatars/${username}.jpg`}
          alt="My Profile"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  )
}
export default memo(SidebarUser)
