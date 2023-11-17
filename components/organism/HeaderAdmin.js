import React from 'react';

const HeaderAdmin = ({ pathname }) => {
  return (
    <header className="fixed flex items-center w-full h-24 px-5 shadow-lg bg-abu">
      <div className="text-sm font-medium uppercase text-primary">
        {pathname}
      </div>
    </header>
  );
};

export default HeaderAdmin;
