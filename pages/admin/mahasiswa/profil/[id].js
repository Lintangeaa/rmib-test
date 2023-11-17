import GetMahasiswaById from '@/api/users/GetMahasiswaById';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Profil = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isHitApi, setIsHitApi] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [phone, setPhone] = useState('');

  const fetchMahasiswa = async () => {
    setIsHitApi(true);
    const res = await GetMahasiswaById({ id });
    console.log(res);
    if (res.status) {
      const data = res.data;
      setUsername(data.username);
      setEmail(data.email);
      setStatus(data.status);
      setName(data.name);
      setNim(data.nim);
      setProdi(data.prodi);
      setPhone(data.phone);
      setTimeout(() => {
        setIsHitApi(false);
      }, 2000);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setIsHitApi(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, [router]);

  return <div>aaa</div>;
};

export default Profil;
