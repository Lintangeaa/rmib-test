import GetResultByUserId from '@/api/rmib/GetResultByUserId';
import GetMahasiswaById from '@/api/users/GetMahasiswaById';
import Layout from '@/components/organism/Layout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const Result = () => {
  const [rmib, setRmib] = useState('');
  const [mahasiswa, setMahasiswa] = useState({});
  const [result, setResult] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const categories = [
    {
      label: 'Outdoor',
      name: 'outdoor',
      desc: 'Anda menunjukkan minat tinggi dalam pekerjaan yang melibatkan aktivitas di luar ruangan, seperti petualangan, olahraga ekstrem, atau pekerjaan lingkungan.',
    },
    {
      label: 'Mecanical',
      name: 'mecanical',
      desc: 'Minat Anda dalam pekerjaan mekanikal menandakan ketertarikan terhadap mesin, teknologi, dan pemecahan masalah teknis.',
    },
    {
      label: 'Computational',
      name: 'computational',
      desc: 'Anda memiliki keterampilan komputasional yang kuat dan minat dalam pekerjaan yang melibatkan pemrograman, pengembangan perangkat lunak, atau analisis data.',
    },
    {
      label: 'Science',
      name: 'science',
      desc: 'Hasil tes menunjukkan minat Anda dalam pekerjaan ilmiah, penelitian, atau eksplorasi ilmu pengetahuan.',
    },
    {
      label: 'Personal Contact',
      name: 'personalContact',
      desc: 'Karakteristik Anda menunjukkan kecenderungan untuk mengejar pekerjaan yang melibatkan interaksi manusiawi, seperti pelayanan pelanggan, manajemen acara, atau hubungan masyarakat.',
    },
    {
      label: 'Aesthetic',
      name: 'aesthetic',
      desc: 'Anda memiliki kepekaan seni dan estetika yang tinggi, dengan minat dalam pekerjaan yang melibatkan desain, seni visual, atau penciptaan konten estetis.',
    },
    {
      label: 'Literary',
      name: 'literary',
      desc: 'Minat Anda terletak pada bidang sastra dan kreativitas verbal, menunjukkan potensi untuk mengejar pekerjaan dalam penulisan, penyuntingan, atau pendidikan sastra.',
    },
    {
      label: 'Music',
      name: 'music',
      desc: 'Sebagaimana Anda sudah tahu, hasil tes menunjukkan minat tinggi dalam musik, menggambarkan hasrat dan bakat dalam dunia musik.',
    },
    {
      label: 'Social Service',
      name: 'socialService',
      desc: 'Minat Anda mencakup pekerjaan yang memiliki dampak positif pada masyarakat, seperti pekerjaan amal, bantuan kemanusiaan, atau pekerjaan sosial.',
    },
    {
      label: 'Clarical',
      name: 'clarical',
      desc: 'Anda menunjukkan kecenderungan untuk mengejar pekerjaan administratif dan kegiatan kantor, dengan fokus pada organisasi dan manajemen.',
    },
    {
      label: 'Practical',
      name: 'practical',
      desc: 'Hasil tes menunjukkan minat Anda dalam pekerjaan yang melibatkan keterampilan praktis dan keterampilan tangan, seperti konstruksi, pertanian, atau perbaikan.',
    },
    {
      label: 'Medical',
      name: 'medical',
      desc: 'Anda memiliki minat dalam bidang kesehatan dan pelayanan medis, menunjukkan potensi untuk mengejar karir dalam kedokteran, perawatan kesehatan, atau penelitian medis.',
    },
  ];

  useEffect(() => {
    const getUser = Cookies.get('User');
    const user = JSON.parse(getUser);
    const id = user.id;

    try {
      GetResultByUserId({ id }).then((res) => {
        console.log('res', res);
        if (res.status === false) {
          console.log('Kaga ada');
        }

        const rmib = res.data;
        setRmib(rmib);
        setResult(JSON.parse(rmib.result));
      });
      GetMahasiswaById({ id }).then((res) => {
        console.log('res mahasiswa', res);
        if (!res) {
          console.log('Kaga ada');
        }

        setMahasiswa(res.data);
      });
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Layout>
      <section className="justify-center">
        <h1 className="my-8 font-semibold text-center text-black">
          Hasil PSIKOTES RMIB
        </h1>

        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="px-5 py-4 border-2 rounded border-primary">
            <div className="flex w-1/2 text-sm">
              <p className="w-16">Nama</p>
              <div className="px-2 bg-blue-300 border text-primary bg-opacity-30 rounded-xl border-primary">
                {mahasiswa.name}
              </div>
            </div>
            <div className="flex w-1/2 mt-5 text-sm">
              <p className="w-16">NIM</p>
              <div className="px-2 bg-blue-300 border text-primary bg-opacity-30 rounded-xl border-primary">
                {mahasiswa.nim}
              </div>
            </div>
            <p className="mt-10 mb-4">
              Jenis pekerjaan yang paling anda minati adalah{' '}
              <span
                className="w-auto px-2 text-sm font-medium text-center text-orange-700 bg-orange-200 border border-orange-700 cursor-pointer rounded-xl"
                onClick={handleModal}
              >
                {
                  categories.find((category) => category.name === rmib.minat)
                    ?.label
                }
              </span>
            </p>

            <Modal open={showModal} onCancel={handleModal} footer={[]}>
              <p>
                {
                  categories.find((category) => category.name === rmib.minat)
                    ?.desc
                }
              </p>
            </Modal>
            <div className="flex flex-wrap -mx-2">
              {result.map((data, i) => (
                <div key={i} className="w-auto px-2 mb-4">
                  <div className="flex items-center px-2 space-x-1 text-sm text-green-700 bg-green-500 border border-green-700 rounded-xl bg-opacity-30 whitespace-nowrap">
                    <div>{i + 1}.</div>
                    <div>
                      {
                        categories.find((category) => category.name === data)
                          ?.label
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Result;
