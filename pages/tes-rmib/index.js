import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import LayoutRmib from '../../components/rmib/LayoutRmib';
import Loader from '@/components/Loader';
import GetResultByUserId from '@/api/rmib/GetResultByUserId';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Footer from '@/components/organism/Footer';

const Index = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));

    const id = user.id;

    try {
      GetResultByUserId({ id }).then((res) => {
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
      <div className="flex justify-start px-20">
        <Link href={'/'}>
          <AiOutlineArrowLeft className="p-2 mt-10 text-4xl text-red-700 bg-red-500 border border-red-700 rounded bg-opacity-30 hover:bg-opacity-50" />
        </Link>
      </div>
      <div className="flex items-center justify-center h-80">
        <Link href="/tes-rmib/section-a">
          <button className="font-medium bg-blue-400 border rounded-xl border-primary hover:bg-opacity-50 text-primary bg-opacity-30 w-36 h-11">
            Mulai Tes
          </button>
        </Link>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </LayoutRmib>
  );
};

export default Index;
