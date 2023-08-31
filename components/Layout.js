import React from "react"
import Header from "./Header"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <main>
      <Header>
        <Navbar />
      </Header>
      <div className="px-20">{children}</div>
    </main>
  )
}

export default Layout
