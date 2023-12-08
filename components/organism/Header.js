import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import WhoamiApi from '@/api/auth/Whoami';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Logo from '../atom/Logo';

const Header = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      const user = JSON.parse(Cookies.get('User'));
      setUser(user);
      if (user) {
        setIsLogin(true);
      }
    }
  }, [router]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('User');

    router.push('/auth/login');
  };

  return (
    <header className="flex items-center justify-between w-full h-32 px-5 border-b-2 border-white shadow-lg lg:px-20 bg-primary">
      <div className="items-center justify-start hidden lg:flex lg:w-1/6 ">
        Logo Disini
      </div>
      <div className="flex w-full lg:justify-center md:w-4/6">{children}</div>
      <div
        onClick={toggleMenu}
        className="flex items-center justify-end lg:w-1/6"
      >
        <span className="font-semibold text-white me-2 first-letter:uppercase">
          {user.username}
        </span>
        <FaUserAlt className="p-1 text-5xl text-white border-2 rounded-full hover:cursor-pointer" />
        {showMenu && (
          <div className="absolute p-2 mt-10 bg-white border rounded-lg shadow-2xl min-w-fit top-20 border-primary right-12">
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
  );
};

export default Header;
