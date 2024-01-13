import GetAllRmibResult from '@/api/rmib/GetAllRmibResult';
import LayoutAdmin from '@/components/LayoutAdmin';
import SelectInput from '@/components/input/SelectInput';
import PieCharts from '@/components/molekul/PieCharts';
import ContentData from '@/store/ContentData';
import React, { useEffect, useState } from 'react';

const LaporanKonseling = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [countByProdi, setCountByProdi] = useState([]);
  const [countByAngkatan, setCountByAngkatan] = useState([]);

  const [filterPie, setFilterPie] = useState('Angkatan');

  const getData = async () => {
    const res = await GetAllRmibResult();
    if (res.status) {
      setData(res.data.data);
      setCount(res.data.count);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const countByProdiData = ContentData.selectOption.prodi.map((prodi) => ({
      name: prodi,
      value: data.filter((item) => item.Mahasiswa.prodi === prodi).length,
    }));
    const countByAngkatanData = ContentData.selectOption.angkatan.map(
      (angkatan) => ({
        name: angkatan,
        value: data.filter((item) => item.Mahasiswa.angkatan === angkatan)
          .length,
      }),
    );
    setCountByProdi(countByProdiData);
    setCountByAngkatan(countByAngkatanData);
  }, [data]);

  const filterSelectPie = ['Angkatan', 'Prodi'];

  return (
    <LayoutAdmin>
      <section className="flex justify-between">
        <div className="w-4/6 p-2 border rounded shadow-md">
          <div className="flex justify-center">
            Data Mahasiswa Yang Mengikuti Tes
          </div>
          <div className="w-1/2">
            <SelectInput
              title={'Filter By'}
              options={filterSelectPie}
              value={filterPie}
              onChange={(e) => setFilterPie(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            {filterPie === 'Angkatan' ? (
              <PieCharts data={countByAngkatan} />
            ) : (
              <PieCharts data={countByProdi} />
            )}
          </div>
        </div>
      </section>
    </LayoutAdmin>
  );
};

export default LaporanKonseling;
