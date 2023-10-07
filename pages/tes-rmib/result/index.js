import GetResultByUserId from '@/api/rmib/GetResultByUserId';
import GetMahasiswaById from '@/api/users/GetMahasiswaById';
import Layout from '@/components/organism/Layout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const Result = () => {
  const [sortedValues, setSortedValues] = useState([]);
  const [topCategory, setTopCategory] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [rmib, setRmib] = useState('');
  const [mahasiswa, setMahasiswa] = useState({});

  const categories = [
    { label: 'Outdoor', name: 'outdoor' },
    { label: 'Mecanical', name: 'mecanical' },
    { label: 'Computational', name: 'computational' },
    { label: 'Science', name: 'science' },
    { label: 'Personal Contact', name: 'personalContact' },
    { label: 'Aesthetic', name: 'aesthetic' },
    { label: 'Literary', name: 'literary' },
    { label: 'Music', name: 'music' },
    { label: 'Social Service', name: 'socialService' },
    { label: 'Clarical', name: 'clarical' },
    { label: 'Practical', name: 'practical' },
    { label: 'Medical', name: 'medical' },
  ];

  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));

    const userId = user.id;

    try {
      GetResultByUserId({ userId }).then((res) => {
        if (res.status === false) {
          console.log('Kaga ada');
        }

        const rmib = res.data;
        setRmib(rmib);
      });
      GetMahasiswaById({ userId }).then((res) => {
        if (!res) {
          console.log('Kaga ada');
        }
        const data = res;
        setMahasiswa(data);
      });
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  }, []);

  return (
    <Layout>
      <section className="justify-center">
        <h1 className="my-8 font-semibold text-center text-black">
          Hasil PSIKOTES RMIB
        </h1>
        <div className="flex justify-between">
          <fieldset className="w-1/2 p-2 ">
            <div className="w-full px-5 py-4 border-2 rounded border-primary">
              <p>Nama: {mahasiswa.name}</p>
              <p>NIM : {mahasiswa.nim} </p>
              <p>
                Jenis pekerjaan yang paling anda minati adalah{' '}
                <span className="font-semibold uppercase text-primary">
                  {rmib.pertama}
                </span>
              </p>
            </div>
          </fieldset>
          <fieldset className="flex flex-col items-center p-2">
            <p>Tabel urutan pekerjaan dari paling disukai </p>
            <table className="border border-primary">
              <thead>
                <tr>
                  <td className="px-4 py-2 border-2 border-primary">No</td>
                  <td className="px-4 py-2 border-2 border-primary">
                    Jenis Pekerjaan
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center border-2 border-primary">
                    1
                  </td>
                  <td className="px-4 py-2 text-center uppercase border-2 border-primary">
                    {rmib.pertama}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-center border-2 border-primary">
                    2
                  </td>
                  <td className="px-4 py-2 text-center uppercase border-2 border-primary">
                    {rmib.kedua}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-center border-2 border-primary">
                    2
                  </td>
                  <td className="px-4 py-2 text-center uppercase border-2 border-primary">
                    {rmib.ketiga}
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
      </section>
    </Layout>
  );
};

export default Result;
