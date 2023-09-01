import React, { useEffect, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import WhoamiApi from "@/api/auth/Whoami"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const Header = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [isHitApi, setIsHitApi] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      router.push("/auth/login")
    }
  }, [router])

  useEffect(() => {
    WhoamiApi().then((res) => {
      setIsHitApi(true)
      if (res) {
        setUser(res)
        const data = res
        Cookies.set("User", JSON.stringify(data))
      }
    })
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("User")

    router.push("/auth/login")
  }

  console.log(user)
  return (
    <header className="flex items-center justify-between w-full h-40 px-20 shadow-xl bg-primary">
      <div className="w-5 h-5 bg-black">logo</div>
      {children}
      <div onClick={toggleMenu} className="flex items-center">
        <span className="text-white me-8">{user.username}</span>
        <FaUserAlt className="p-1 text-5xl text-white border-2 rounded-full hover:cursor-pointer" />
        {showMenu && (
          <div className="absolute p-2 mt-10 bg-white border rounded-lg shadow-2xl min-w-fit top-20 border-primary right-8">
            <div className="block w-full px-4 py-2 text-left rounded cursor-pointer text-primary hover:bg-primary hover:text-white">
              Profile
            </div>
            <button
              className="block w-full px-4 py-2 text-left rounded text-primary hover:text-white hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
