import Badge from '@/components/atom/Badge';
import Layout from '@/components/organism/Layout';
import Image from 'next/image';
import React from 'react';

const index = () => {
  return (
    <Layout>
      <div className="flex w-full">
        <div className="flex items-center justify-center w-1/2">
          <Image
            src={'coming-soon.svg'}
            width={500}
            height={50}
            alt="inner-journey"
          />
        </div>
        <div className="flex items-center justify-center w-1/2">
          <Badge text={'Segera Hadir'} variant={'blue'} />
        </div>
      </div>
    </Layout>
  );
};

export default index;
