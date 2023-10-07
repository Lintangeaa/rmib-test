import React from "react"

const ButtonPutih = ({ title, classname }) => {
  return (
    <button
      className={`font-bold bg-white rounded-lg text-primary w-44 h-11 ${classname}`}
    >
      {title}
    </button>
    
  )
}

export default ButtonPutih
