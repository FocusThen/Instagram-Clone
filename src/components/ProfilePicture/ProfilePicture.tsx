import React, { HtmlHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

export type ProfilePictureProps = {
  className?: string
  username: string | null
  alt?: string
} & HtmlHTMLAttributes<HTMLImageElement>

export default function ProfilePicture({
  className,
  username,
  ...restProps
}: ProfilePictureProps) {
  const imageClasses = classNames('rounded-full  flex', className)
  return (
    <Link to={`/p/${username}`}>
      <img
        className={imageClasses}
        src={`/assets/images/avatars/${username}.jpg`}
        {...restProps}
      />
    </Link>
  )
}
