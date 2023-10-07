import Link from 'next/link';
import React from 'react';

const DropdownItem = ({ title, link }) => {
  return (
    <div className="px-1 font-semibold transition-all duration-300 rounded cursor-pointer hover:bg-white hover:text-primary hover:ps-4">
      <Link href={link}>{title}</Link>
    </div>
  );
};

export default DropdownItem;
