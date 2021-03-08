import React, { useEffect } from 'react'
import TheHeader from '@app/components/TheHeader/TheHeader'
import TheTimeLine from '@app/components/TheTimeline/TheTimeLine'
import Sidebar from '@app/components/Sidebar/Sidebar'

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram Clone'
  }, [])

  return (
    <div className="bg-gray-50">
      <TheHeader />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <TheTimeLine />
        <Sidebar />
      </div>
    </div>
  )
}
