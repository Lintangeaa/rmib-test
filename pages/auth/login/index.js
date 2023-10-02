import LoginApi from '@/api/auth/LoginApi';
import Loader from '@/components/Loader';
import ButtonPutih from '@/components/button/ButtonPutih';
import InputWithTitle from '@/components/input/InputWithTitle';
import { Alert } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import WhoamiApi from '@/api/auth/Whoami';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHitApi, setIsHitApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsHitApi(true);
    LoginApi({ email, password }).then((res) => {
      console.log(res);
      setIsHitApi(false);

      if (res.status === true) {
        const token = res.token;
        setMessage(res.message);
        Cookies.set('token', token);
        WhoamiApi().then((res) => {
          setIsHitApi(true);
          console.log('res', res);
          if (res) {
            const data = res;
            Cookies.set('User', JSON.stringify(data));
          }
        });
        setIsLoading(true);
        if (res.payload.role === 'admin') {
          setTimeout(() => {
            setIsLoading(false);
            router.push('/admin');
          }, 3000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            router.push('/');
          }, 3000);
        }
      } else {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
        setMessage(res.message);
      }
    });
  };

  return (
    <main className="flex flex-col items-center">
      {isLoading ? <Loader /> : null}

      <section className="w-1/3 p-8 mt-40 rounded-lg shadow-xl bg-primary">
        <div className="font-semibold text-center text-white">Login</div>
        <form className="px-8" onSubmit={handleSubmit}>
          <InputWithTitle
            title={'Email'}
            type={'email'}
            placeholder={'Masukan email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputWithTitle
            title={'Password'}
            type={'password'}
            placeholder={'Masukan password ..'}
            classname={'mt-5'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-center">
            <ButtonPutih title={'Login'} classname={'mt-5'} />
          </div>
        </form>
      </section>
      <div className="flex justify-center mt-5">
        {alert ? <Alert type="error" message={message} showIcon /> : null}
      </div>
    </main>
  );
};

export default Login;
