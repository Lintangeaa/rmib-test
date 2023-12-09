import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-auto">
      <Image
        src={'/inner.png'}
        width={120}
        height={50}
        alt="Career Development Center"
      ></Image>
    </div>
  );
};

export default Logo;
