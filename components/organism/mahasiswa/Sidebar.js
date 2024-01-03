import DropdownItem from '@/components/atom/DropdownItem';
import Logo from '@/components/atom/Logo';
import NavItem from '@/components/atom/NavItem';
import ActionButton from '@/components/button/ActionButton';
import DropdownNav from '@/components/molekul/DropdownNav';
import React, { useState } from 'react';
import { BsMenuButtonWide, BsMenuButtonWideFill } from 'react-icons/bs';

const Sidebar = () => {
  const [isAsideVisible, setAsideVisibility] = useState(false);

  const toggleAside = () => {
    setAsideVisibility(!isAsideVisible);
  };

  return (
    <div className="relative z-10 text-white lg:flex lg:flex-shrink-0">
      <button
        onClick={toggleAside}
        className="fixed left-0 z-50 p-4 top-3 lg:hidden focus:outline-none"
      >
        {!isAsideVisible ? (
          <BsMenuButtonWide className="text-lg" />
        ) : (
          <BsMenuButtonWideFill className="text-lg" />
        )}
      </button>
      <button
        onClick={toggleAside}
        className="fixed z-50 p-4 left-36 top-3 lg:hidden focus:outline-none"
      >
        {isAsideVisible ? <ActionButton variant={'close'} /> : ''}
      </button>

      <aside
        className={`${
          isAsideVisible ? 'fixed' : 'hidden'
        } flex-col w-1/2 h-screen px-5 -z-20 flex space-y-4 text-white border-r-2 shadow-xl bg-primary border-primary lg:hidden`}
      >
        <div className="flex items-center justify-center h-32 pt-5 space-x-4">
          <Logo />
          <p className="text-sm text-white">Inner Journey</p>
        </div>
        <NavItem title={'Beranda'} link={'/'} />
        <DropdownNav title={'TES MINAT'}>
          <DropdownItem title={'RMIB'} link={'/tes-rmib'} />
          <DropdownItem title={'MBTI'} link={'/tes-rmib'} />
        </DropdownNav>
        <NavItem title={'Tentang Kami'} link={'/'} />
      </aside>
    </div>
  );
};

export default Sidebar;
