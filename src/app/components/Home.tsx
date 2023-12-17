import React from 'react'
import LeftSidebar from './sidebar/LeftSidebar'
import RightSidebar from './sidebar/RightSidebar'
import MainPanel from './main-panel/MainPanel'

const Home = () => {
  return (
    // 'h-screen', 'w-screen' is to make the page full screen
    // In CSS, it is same as 'height: 100vh; width: 100vw'
    // While 'h-full', 'w-full' is same as 'height: 100%; width: 100%', it means the height and width is 100% of the parent element
    <div className="flex h-screen w-screen bg-gray-200">

      {/* Left sidebar */}
      <LeftSidebar />

      {/* Main panel */}
      {/* 'flex-1': to allow a flex item to grow and shrink as needed, then it will push the right sidebar to the right */}
      <div className="flex-1">
        <MainPanel />
      </div>

      {/* Right sidebar */}
      <RightSidebar />
    </div>
  )
}

export default Home