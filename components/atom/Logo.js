import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-1/3">
      <Image
        src={'/cdc.png'}
        width={200}
        height={200}
        alt="Career Development Center"
      ></Image>
    </div>
  );
};

export default Logo;
