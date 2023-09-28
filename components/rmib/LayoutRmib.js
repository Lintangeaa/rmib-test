import React from "react"
import Header from "../Header"

const LayoutRmib = ({ children }) => {
  return (
    <main>
      <Header>
        <button className="font-bold bg-white rounded-lg w-36 h-11 text-primary">
          RMIB
        </button>
      </Header>
      <fieldset className="flex justify-start px-16 mt-8 font-semibold text-primary">
        Hi, user
      </fieldset>
      <fieldset className="px-16">{children}</fieldset>
    </main>
  )
}

export default LayoutRmib
