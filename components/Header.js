import React from "react"
import NavItem from "./NavItem"
import { FaUserAlt } from "react-icons/fa"

const Header = ({ children }) => {
  return (
    <header className="flex items-center justify-between w-full h-40 px-16 shadow-xl bg-primary">
      <div className="w-5 h-5 bg-black">logo</div>
      {children}
      <div>
        <FaUserAlt className="p-1 text-5xl text-white border-2 rounded-full hover:cursor-pointer" />
      </div>
    </header>
  )
}

export default Header
