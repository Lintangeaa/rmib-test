import Image from 'next/image';
import React from 'react';

const DataNotFound = ({ description }) => {
  return (
    <div className="flex flex-col items-center w-full p-10">
      <Image src={'/no-data.svg'} width={250} height={200} alt="innerjourney" />
      <div className="px-2 text-sm text-red-600 bg-red-500 border border-red-500 rounded-xl bg-opacity-30">
        {description}
      </div>
    </div>
  );
};

export default DataNotFound;
