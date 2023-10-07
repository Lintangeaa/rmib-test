import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

const DropdownNav = ({ children, title }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <span
        className="flex items-center font-bold cursor-pointer"
        onMouseEnter={openDropdown}
        onClick={toggleDropdown}
      >
        {title}{' '}
        <BiChevronDown
          className={`text-xl transform transition-all duration-300 ${
            showDropdown ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </span>
      {showDropdown && (
        <div
          className="absolute left-0 flex flex-col w-auto min-w-full p-2 mt-2 transition-all duration-300 border-2 border-white rounded-lg shadow-lg bg-primary top-8"
          onMouseLeave={closeDropdown}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownNav;
