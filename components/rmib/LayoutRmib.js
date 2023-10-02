import React from "react"
import Header from "../Header"

const LayoutRmib = ({ children }) => {
  return (
    <main className="bg-abu">
      <Header>
        <button className="font-bold bg-white rounded-lg w-36 h-11 text-primary">
          RMIB
        </button>
      </Header>

      <fieldset className="">{children}</fieldset>
    </main>
  )
}

export default LayoutRmib
