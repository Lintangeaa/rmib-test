import React from "react"

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-4 animate-bounce">
          <span className="h-16 p-2 text-white rounded-md whitespace-nowrap bg-primary">
            Loading guys...
          </span>
        </div>
        <div className="w-16 h-16 border-t-4 rounded-full border-third animate-spin"></div>
      </div>
    </div>
  )
}

export default Loader
