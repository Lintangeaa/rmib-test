import LayoutAdmin from '@/components/LayoutAdmin';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Admin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('User');
    const userData = userCookie ? JSON.parse(userCookie) : null;
    setUser(userData);
  }, []);

  return (
    <LayoutAdmin>
      <div className="">
        Selamat Datang,{' '}
        <span className="font-semibold uppercase">
          {user ? user.username : 'Guest'}
        </span>
      </div>
    </LayoutAdmin>
  );
};

export default Admin;
