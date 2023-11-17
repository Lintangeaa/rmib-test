import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from '../molekul/Navbar';
import Footer from './Footer';
import { useRouter } from 'next/router';
import Loader from '../Loader';
import Cookies from 'js-cookie';

const Layout = ({ children }) => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      const user = JSON.parse(Cookies.get('User'));
      if (user) {
        setIsLogin(true);
      }
    }
  }, [router]);
  return (
    <main className="bg-white ">
      {isLogin ? (
        <div className="min-h-screen bg-white">
          <Header>
            <Navbar />
          </Header>
          <div className="">{children}</div>
          <Footer />
        </div>
      ) : null}
    </main>
  );
};

export default Layout;
