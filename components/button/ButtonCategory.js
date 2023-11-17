import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const SetCategory = ({ men, children, woman }) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));
    setUser(user);
  }, []);

  return (
    <div className="flex justify-between w-full h-6 space-x-2">
      {user.gender === 'laki-laki' && (
        <div
          className={`flex w-64 justify-center items-center text-sm text-primary font-medium rounded-xl border border-primary bg-blue-300 bg-opacity-30`}
        >
          {men}
        </div>
      )}
      {user.gender === 'perempuan' && (
        <div
          className={`flex px-2 w-64 justify-center items-center text-sm font-medium text-green-600 rounded-xl border border-green-400 bg-green-300 bg-opacity-40`}
        >
          {woman}
        </div>
      )}
      {children}
    </div>
  );
};

export default SetCategory;
