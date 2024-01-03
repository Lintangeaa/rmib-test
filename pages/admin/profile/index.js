import LayoutAdmin from '@/components/LayoutAdmin';
import ToggleOnOf from '@/components/button/ToggleOnOf';
import InputDetail from '@/components/input/inputDetail';
import { Alert } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const data = Cookies.get('User');

    if (data) {
      setUser(JSON.parse(data));
      const e = JSON.parse(data);
      setUsername(e.username);
      setEmail(e.email);
    }
  }, []);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  console.log(isEdit);
  return (
    <LayoutAdmin>
      <form className="flex flex-col w-1/2 space-y-3">
        <div className="flex justify-between h-10">
          <ToggleOnOf
            title={'Edit Akun'}
            status={isEdit}
            onClick={toggleEdit}
          />
          {isSuccess ? (
            <Alert type="success" message={message} showIcon />
          ) : null}
          {isError ? <Alert type="error" message={message} showIcon /> : null}
        </div>
      </form>
    </LayoutAdmin>
  );
};

export default Index;
