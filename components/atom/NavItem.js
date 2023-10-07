import React from 'react';
import Link from 'next/link';

const NavItem = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="font-bold transition-all duration-300 border-b-2 hover:border-b-2 border-primary hover:border-white"
    >
      {title}
    </Link>
  );
};

export default NavItem;
