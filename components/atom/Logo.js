import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-auto">
      <Image
        src={'/cdc.png'}
        width={30}
        height={30}
        alt="Career Development Center"
      ></Image>
    </div>
  );
};

export default Logo;
