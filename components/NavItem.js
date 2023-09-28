import React from "react"
import Link from "next/link"

const NavItem = ({ title, link }) => {
  return (
    <Link href={link} className="font-bold">
      {title}
    </Link>
  )
}

export default NavItem
