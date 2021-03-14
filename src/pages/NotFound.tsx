import React, { useEffect } from 'react'
import TheHeader from '@app/components/TheHeader/TheHeader'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Not Found'
  }, [])

  return (
    <section className="bg-gray">
      <TheHeader />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </section>
  )
}
