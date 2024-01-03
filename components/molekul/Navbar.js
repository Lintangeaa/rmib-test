import NavItem from '../atom/NavItem';

import React, { useState } from 'react';
import DropdownNav from './DropdownNav';
import DropdownItem from '../atom/DropdownItem';

const Navbar = () => {
  return (
    <nav className="justify-between hidden w-full space-x-6 text-white md:max-w-sm lg:max-w-md md:flex lg:space-x-14 ">
      <NavItem title={'HOME'} link={'/'} />
      <DropdownNav title={'TES MINAT'}>
        <DropdownItem title={'RMIB'} link={'/tes-rmib'} />
        <DropdownItem title={'MBTI'} link={'/coming-soon'} />
      </DropdownNav>
      <NavItem title={'TENTANG KAMI'} link={'/'} />
    </nav>
  );
};

export default Navbar;
