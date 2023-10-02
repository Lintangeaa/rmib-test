import React from "react"

const SetCategory = ({ men, children, woman }) => {
  return (
    <div className="flex justify-between w-full ">
      <div
        className={`flex justify-center items-center text-xs lg:text-base lg:font-bold text-white rounded-lg  w-28 lg:w-44 h-11 bg-primary`}
      >
        {men}
      </div>
      {children}
      <div
        className={`flex justify-center items-center text-xs lg:text-base lg:font-bold text-white rounded-lg  w-28 lg:w-44 h-11 bg-primary`}
      >
        {woman}
      </div>
    </div>
  )
}

export default SetCategory
