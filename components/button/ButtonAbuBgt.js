import React from "react"
import Link from "next/link"

const ButtonAbuBgt = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="font-bold text-white rounded-lg w-44 bg-abubgt h-11"
    >
      {title}
    </button>
  )
}

export default ButtonAbuBgt
