import React from "react"
import Link from "next/link"

const ButtonAbuBgt = ({ link, title }) => {
  return (
    <Link href={link}>
      <button className="font-bold text-white rounded-lg w-44 bg-abubgt h-11">
        {title}
      </button>
    </Link>
  )
}

export default ButtonAbuBgt
