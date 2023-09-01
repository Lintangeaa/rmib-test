import React from "react"

const ButtonPrimary = ({ title }) => {
  return (
    <button className="font-bold text-white rounded-lg w-44 bg-primary h-11">
      {title}
    </button>
  )
}

export default ButtonPrimary
