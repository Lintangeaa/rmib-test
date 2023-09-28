import React from "react"
import NavItem from "./NavItem"

const Navbar = () => {
  return (
    <nav className="flex justify-between text-white space-x-14">
      <NavItem title={"HOME"} link={"/"} />
      <NavItem title={"TES BAKAT"} link={"/tes-rmib"} />
      <NavItem title={"TENTANG KAMI"} link={"/"} />
    </nav>
  )
}

export default Navbar
