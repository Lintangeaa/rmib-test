import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import LayoutRmib from '../../components/rmib/LayoutRmib';
import Loader from '@/components/Loader';
import GetResultByUserId from '@/api/rmib/GetResultByUserId';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(Cookies.get('User'));

    const userId = user.id;

    try {
      GetResultByUserId({ userId }).then((res) => {
        if (!res) {
          console.log('Kaga ada');
        }

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          router.push('/tes-rmib/result');
        }, 1000);
      });
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  }, [router]);
  return (
    <main>
      <LayoutRmib>
        {isLoading ? <Loader /> : null}
        <div className="flex items-center justify-center h-screen px-16">
          <Link href="/tes-rmib/section-a">
            <button className="font-bold text-white rounded-lg bg-primary w-36 h-11">
              Mulai Tes
            </button>
          </Link>
        </div>
      </LayoutRmib>
    </main>
  );
};

export default Index;
