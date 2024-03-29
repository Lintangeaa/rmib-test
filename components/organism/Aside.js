import React from 'react';
import Logo from '../atom/Logo';
import SideItem from '../atom/SideItem';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import ButtonLogout from '../button/ButtonLogout';

const Aside = () => {
  return (
    <aside className="fixed flex flex-col w-1/6 h-screen px-4 py-5 space-y-3 bg-primary ">
      <div className="flex items-center h-10 mb-10 space-x-4">
        <Logo />
        <p className="font-semibold text-white">Inner Journey</p>
      </div>
      <SideItem title={'Dashboard'} link={'/admin/dashboard'}>
        <MdOutlineDashboardCustomize />
      </SideItem>
      <SideItem title={'Data Mahasiswa'} link={'/admin/mahasiswa'}>
        <PiStudent />
      </SideItem>
      <SideItem title={'Laporan Konseling'} link={'/admin/laporan-konseling'}>
        <PiStudent />
      </SideItem>
      <div className="flex justify-start mt-20">
        <ButtonLogout />
      </div>
    </aside>
  );
};

export default Aside;
