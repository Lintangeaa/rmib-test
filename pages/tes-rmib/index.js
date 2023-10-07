import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import LayoutRmib from '../../components/rmib/LayoutRmib';
import Loader from '@/components/Loader';
import GetResultByUserId from '@/api/rmib/GetResultByUserId';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));

    const userId = user.id;

    console.log(userId);

    try {
      GetResultByUserId({ userId }).then((res) => {
        console.log(res);
        if (!res) {
          console.log('Kaga ada');
        } else if (res.status === true) {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            router.push('/tes-rmib/result');
          }, 2000);
        }
      });
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  }, [router]);

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <div className="flex justify-start px-20 mt-10">
        <Link href={'/'}>
          <AiOutlineArrowLeft className="p-2 text-4xl text-white rounded bg-abubgt hover:bg-primary" />
        </Link>
      </div>
      <div className="flex items-center justify-center h-screen">
        <Link href="/tes-rmib/section-a">
          <button className="font-bold text-white rounded-lg bg-primary w-36 h-11">
            Mulai Tes
          </button>
        </Link>
      </div>
    </LayoutRmib>
  );
};

export default Index;
