import React from 'react';
import NavItem from './NavItem';

const Navbar = () => {
  return (
    <nav className="justify-between hidden w-full space-x-6 text-white md:max-w-sm lg:max-w-md md:flex lg:space-x-14 ">
      <NavItem title={'HOME'} link={'/'} />
      <NavItem title={'TES BAKAT'} link={'/tes-rmib'} />
      <NavItem title={'TENTANG KAMI'} link={'/'} />
    </nav>
  );
};

export default Navbar;
