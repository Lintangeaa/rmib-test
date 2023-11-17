import React, { useState, useEffect } from 'react';
import Aside from './organism/Aside';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import HeaderAdmin from './organism/HeaderAdmin';
import Footer from './organism/Footer';

const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState('');
  const { pathname } = router;

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      const user = JSON.parse(Cookies.get('User'));
      setUser(user);
    }
  }, [router]);

  const lastSegment = pathname.split('/').pop();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="w-1/5">
          <Aside />
        </div>
        <div className="flex flex-col w-full">
          <div className="h-24">
            <HeaderAdmin pathname={lastSegment} />
          </div>
          <div className="flex-1 p-5 overflow-y-auto bg-white">{children}</div>
        </div>
      </div>
      <div className="z-20">
        <Footer />
      </div>
    </div>
  );
};

export default LayoutAdmin;
