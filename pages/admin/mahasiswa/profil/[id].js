import GetMahasiswaById from '@/api/users/GetMahasiswaById';
import ResetPasswordApi from '@/api/users/ResetPasswordApi';
import UpdateMahasiswaApi from '@/api/users/UpdateMahasiswaApi';
import LayoutAdmin from '@/components/LayoutAdmin';
import Badge from '@/components/atom/Badge';
import DataNotFound from '@/components/atom/DataNotFound';
import Button from '@/components/button/Button';
import ButtonModal from '@/components/button/ButtonModal';
import ToggleOnOf from '@/components/button/ToggleOnOf';
import InputDetail from '@/components/input/inputDetail';
import ContentData from '@/store/ContentData';
import { Alert } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Profil = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isHitApi, setIsHitApi] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState('');
  const [minat, setMinat] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isTest, setIsTest] = useState(false);

  const fetchMahasiswa = async () => {
    setIsHitApi(true);
    const res = await GetMahasiswaById({ id });
    if (res.status) {
      const data = res.data;
      setResult(JSON.parse(data.rmib?.result ?? null));
      setMinat(matchCategory(data.rmib?.minat ?? null));
      setUsername(data.username);
      setEmail(data.email);
      setStatus(data.status);
      setName(data.name);
      setNim(data.nim);
      setProdi(data.prodi);
      setGender(data.gender);
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
    if (id) {
      fetchMahasiswa();
    }
  }, [id, fetchMahasiswa]);

  const handleBack = () => {
    router.push('/admin/mahasiswa');
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const matchCategory = (param) => {
    const foundCategory = ContentData.categories.find(
      (category) => category.name === param,
    );

    return foundCategory ? foundCategory.label : null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await UpdateMahasiswaApi({
      id,
      email,
      name,
      nim,
      prodi,
      phone,
    });

    if (res.status) {
      setIsSuccess(true);
      setMessage(res.message);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        setIsEdit(false);
      }, 3000);
    } else {
      setIsError(true);
      setMessage(res.message);
      setTimeout(() => {
        setIsError(false);
        setMessage('');
      }, 3000);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await ResetPasswordApi(id);
    if (res.status) {
      setIsSuccess(true);
      setMessage(res.message);
      setTimeout(() => {
        setIsSuccess(false);
        setMessage('');
        setIsEdit(false);
      }, 3000);
    } else {
      setIsError(true);
      setMessage(res.message);
      setTimeout(() => {
        setIsError(false);
        setMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    if (result != null) {
      setIsTest(true);
    } else {
      setIsTest(false);
    }
  }, [result]);

  console.log(result);

  return (
    <LayoutAdmin>
      <div className="flex justify-between">
        <ButtonModal variant={'cancel'} text={'Kembali'} onClick={handleBack} />
      </div>
      <div className="flex justify-between w-full mt-5 space-x-4">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col w-1/2 p-5 space-y-2 bg-gray-100 rounded-xl"
        >
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
          <InputDetail
            title={'Nama'}
            value={name}
            disabled={isEdit}
            onChange={(e) => setName(e.target.value)}
          />
          <InputDetail
            title={'NIM'}
            value={nim}
            disabled={isEdit}
            onChange={(e) => setNim(e.target.value)}
          />
          <InputDetail
            title={'Jenis Kelamin'}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <InputDetail
            title={'Program Studi'}
            value={prodi}
            disabled={isEdit}
            onChange={(e) => setProdi(e.target.value)}
          />
          <InputDetail
            title={'Email'}
            value={email}
            type={email}
            disabled={isEdit}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputDetail
            title={'Nomor Handphone'}
            value={phone}
            disabled={isEdit}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex">
            <div className="w-1/3 text-sm">Password</div>
            <ButtonModal
              variant={'cancel'}
              text={'Reset'}
              onClick={handleResetPassword}
            />
          </div>
          <div className="flex">
            <div className="w-1/3 text-sm">Status</div>
            <div
              className={`bg-opacity-30 px-2 rounded-xl border ${
                status === 'aktif'
                  ? 'bg-green-500 text-green-500 border-green-500'
                  : 'bg-red-500 text-red-500 border-red-500'
              }`}
            >
              {status}
            </div>
          </div>
          {isEdit ? (
            <div className="flex justify-end mt-5">
              <Button title={'Update'} onClick={handleUpdate} />
            </div>
          ) : null}
        </form>
        <div className="flex flex-col w-1/2 p-5 space-y-2 bg-gray-100 rounded-xl">
          <div className="flex justify-center">
            <p>Hasil Tes</p>
          </div>
          <div className="flex flex-col items-center">
            <Badge variant={'red'} text={'RMIB'} />
            {isTest ? (
              <div className="flex flex-col items-center w-1/2 space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="text-sm">Paling diminati</p>
                  <Badge variant={'green'} text={minat} />
                </div>
                <div className="flex flex-col space-y-2">
                  {result
                    ? result.map((data, i) => (
                        <Badge
                          key={i}
                          variant={'blue'}
                          text={matchCategory(data)}
                        />
                      ))
                    : null}
                </div>
              </div>
            ) : (
              <DataNotFound description={'Belum melakukan test'} />
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Profil;
