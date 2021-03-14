import React from 'react'

export type PostImageProps = {
  src: string
  caption: string
  totalLikes: number
  totalComments: number
}

export default function PostImage({
  src,
  caption,
  totalLikes,
  totalComments,
}: PostImageProps): JSX.Element {
  return (
    <div className="post__img relative">
      <img src={src} alt={caption} />
      <div className="absolute flex justify-center items-center h-full w-full top-0 z-10 opacity-0 bg-gray-400 bg-opacity-50 hover:opacity-100 transition duration-300 ease-in-out">
        <div className="mr-3 flex items-center">
          <span className="mr-1 text-lg font-semibold">{totalLikes}</span>
          <svg
            className={'w-8 mr-4 select-none text-black'}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <span className="mr-1 text-lg font-semibold">{totalComments}</span>
          <svg
            className="w-8 text-black-light select-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
