import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const HeaderAdmin = ({ pathname }) => {
  const router = useRouter();
  const [user, setUser] = useState('');

  useEffect(() => {
    const data = JSON.parse(Cookies.get('User'));
    if (data) {
      setUser(data);
    }
  }, []);

  const handleProfileAdmin = () => {
    router.push(`/admin/profile`);
  };

  return (
    <header className="fixed flex items-center justify-between w-5/6 h-24 px-5 shadow-lg bg-abu">
      <div className="text-sm font-medium uppercase text-primary">
        {pathname}
      </div>
      <div className="flex flex-col items-center justify-center pe-5">
        <FaUserAlt
          className="text-xl cursor-pointer text-primary"
          onClick={handleProfileAdmin}
        />
        <p className="text-sm italic underline text-primary">{user.username}</p>
      </div>
    </header>
  );
};

export default HeaderAdmin;
