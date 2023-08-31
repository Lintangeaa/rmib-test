import React from "react"
import { FaUserAlt } from "react-icons/fa"
import Link from "next/link"
import Header from "../../components/Header"
import LayoutRmib from "../../components/rmib/LayoutRmib"

const index = () => {
  return (
    <main>
      <LayoutRmib>
        <div className="flex items-center justify-center h-screen px-16">
          <Link href="/tes-rmib/section-a">
            <button className="font-bold text-white rounded-lg bg-primary w-36 h-11">
              Mulai Tes
            </button>
          </Link>
        </div>
      </LayoutRmib>
    </main>
  )
}

export default index
