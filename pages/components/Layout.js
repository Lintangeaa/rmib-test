import React from "react"
import Header from "./Header"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <main>
      <Header>
        <Navbar />
      </Header>
      {children}
    </main>
  )
}

export default Layout
