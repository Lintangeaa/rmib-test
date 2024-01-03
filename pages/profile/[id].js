import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/organism/Layout';
import ButtonModal from '@/components/button/ButtonModal';
import InputDetail from '@/components/input/inputDetail';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});

  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [gender, setGender] = useState('');
  const [prodi, setProdi] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    } else {
      const user = JSON.parse(Cookies.get('User'));
      setUser(user);
      setName(user.name);
      setNim(user.nim);
      setGender(user.gender);
      setProdi(user.prodi);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [router]);

  const handleClickCaptcha = () => {
    fetch('http://localhost:8070/api/auth/generate-captcha', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <ButtonModal variant={'cancel'} text={'Kembali'} />
      </div>
      <button onClick={handleClickCaptcha}>aaa</button>
      <div className="flex justify-between w-full mt-5 space-x-4">
        <form className="flex flex-col w-1/2 p-5 space-y-2 bg-gray-100 rounded-xl">
          <InputDetail title={'Nama'} value={name} />
          <InputDetail title={'NIM'} value={nim} />
          <InputDetail title={'Jenis Kelamin'} value={gender} />
          <InputDetail title={'Program Studi'} value={prodi} />
          <InputDetail title={'Email'} value={email} />
          <InputDetail title={'Nomor Handphone'} value={phone} />
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
