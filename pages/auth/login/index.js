import LoginApi from '@/api/auth/LoginApi';
import Loader from '@/components/Loader';
import Button from '@/components/button/Button';
import InputWithTitle from '@/components/input/InputWithTitle';
import { Alert } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import WhoamiApi from '@/api/auth/Whoami';
import Link from 'next/link';
import Image from 'next/image';
import SignUpApi from '@/api/users/SignUpApi';
import SelectInput from '@/components/input/SelectInput';
import ContentData from '@/store/ContentData';

const Login = () => {
  //sign in
  const [emails, setEmails] = useState('');
  const [passwords, setPasswords] = useState('');
  //sign up
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('mahasiswa');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('S1 Sistem Informasi');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('laki-laki');
  const [angkatan, setAngkatan] = useState('2017');

  const [isHitApi, setIsHitApi] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsHitApi(true);
    LoginApi({ email: emails, password: passwords }).then((res) => {
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
            router.push('/admin/dashboard');
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            router.push('/');
          }, 1000);
        }
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        setMessage(res.message);
      }
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsHitApi(true);
    SignUpApi({
      username,
      email,
      password,
      role,
      name,
      nim,
      prodi,
      angkatan,
      phone,
      gender,
    }).then((res) => {
      console.log(res);
      setIsHitApi(false);

      if (res.status === true) {
        setMessage(res.message);
        setAlert(true);

        setUsername('');
        setEmail('');
        setPassword('');
        setName('');
        setNim('');
        setProdi('S1 Sistem Informasi');
        setAngkatan('2017');
        setPhone('');
        setGender('laki-laki');

        setTimeout(() => {
          setAlert(false);
          setIsSignUpMode(false);
        }, 3000);
      } else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        setMessage(res.message);
      }
    });
  };

  const handleToggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const genders = ['Laki-laki', 'Perempuan'];

  return (
    <main className="flex flex-col items-center bg-white">
      {isLoading ? <Loader /> : null}
      <section className="flex items-center w-full min-h-screen p-2 lg:p-8">
        <div className="items-center justify-center w-full lg:flex ">
          {isSignUpMode ? (
            <div className="items-center justify-center hidden lg:flex lg:w-1/2">
              <Image
                src={'/ilustration-hero.svg'}
                width={500}
                height={100}
                alt="tentangku"
              />
            </div>
          ) : (
            <form
              className="relative flex flex-col justify-center w-full p-8 border-2 lg:w-1/2 rounded-xl"
              onSubmit={handleSignIn}
            >
              <p className="font-semibold mb-14 text-primary">
                Sign In to Inner Journey
              </p>
              <div className="absolute flex justify-center mt-10 top-6 ">
                {isError ? (
                  <Alert type="error" message={message} showIcon />
                ) : null}
              </div>
              <InputWithTitle
                title={'Email'}
                type={'email'}
                placeholder={'Masukan email'}
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
              <InputWithTitle
                title={'Password'}
                type={'password'}
                placeholder={'Masukan password ..'}
                classname={'mt-5'}
                value={passwords}
                onChange={(e) => setPasswords(e.target.value)}
              />
              <div className="flex items-center justify-between mt-2 mb-5">
                <Link className="text-xs text-primary" href={'/'}>
                  Forgot Password
                </Link>
                <div className="text-xs text-primary" href={'/'}>
                  Belum punya akun?{' '}
                  <button
                    className="text-xs font-semibold cursor-pointer text-primary"
                    onClick={handleToggleMode}
                  >
                    {isSignUpMode ? 'Sign In' : 'Sign Up'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end h-1/3">
                <Button title={'sign in'} />
              </div>
            </form>
          )}

          <div className="items-center justify-center w-full mt-5 mb-5 lg:flex lg:w-1/2">
            {isSignUpMode ? (
              <form
                className="flex flex-col justify-center w-full min-h-screen p-8 border-2 rounded-xl"
                onSubmit={handleSignUp}
              >
                <p className="font-semibold text-primary">
                  Sign Up to Inner Journey
                </p>
                <div className="flex justify-center h-12 mt-5">
                  {isError ? (
                    <Alert type="error" message={message} showIcon />
                  ) : null}
                  {alert ? (
                    <Alert type="success" message={message} showIcon />
                  ) : null}
                </div>
                <div className="flex flex-col space-y-2">
                  <InputWithTitle
                    title={'Username'}
                    type={'text'}
                    placeholder={'Masukan username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
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
                  <InputWithTitle
                    title={'Nama'}
                    type={'text'}
                    placeholder={'Masukan nama lengkap'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputWithTitle
                    title={'NIM'}
                    type={'text'}
                    placeholder={'Masukan NIM'}
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                  />
                  <div className="flex justify-between space-x-4">
                    <SelectInput
                      title={'Program Studi'}
                      options={ContentData.selectOption.prodi}
                      value={prodi}
                      onChange={(e) => setProdi(e.target.value)}
                    />

                    <SelectInput
                      title={'Angkatan'}
                      options={ContentData.selectOption.angkatan}
                      value={angkatan}
                      onChange={(e) => setAngkatan(e.target.value)}
                    />

                    <SelectInput
                      title={'Jenis Kelamin'}
                      options={genders}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <InputWithTitle
                    title={'Nomor HP'}
                    type={'text'}
                    placeholder={'Masukan nomor'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-end mt-2 mb-5">
                  <div className="text-xs text-primary" href={'/'}>
                    Sudah punya akun?{' '}
                    <button
                      className="text-xs font-semibold cursor-pointer text-primary"
                      onClick={handleToggleMode}
                    >
                      {isSignUpMode ? 'Sign In' : 'Sign Up'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end h-1/3">
                  <Button title={'sign up'} />
                </div>
              </form>
            ) : (
              <div className="items-center justify-center hidden lg:flex lg:w-1/2">
                <Image
                  src={'/hello.svg'}
                  width={500}
                  height={100}
                  alt="tentangku"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
