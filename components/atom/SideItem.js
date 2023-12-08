import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideItem = ({ children, title, link }) => {
  const router = useRouter();

  const isActive = router.pathname.startsWith(cleanedLink);

  const bgColor = isActive ? 'bg-white ' : '';
  const textColor = isActive ? 'text-primary' : 'text-white';

  return (
    <Link href={link}>
      <div
        className={`flex items-center px-4 py-2 space-x-2 text-sm uppercase transition-all duration-300 rounded-full ${bgColor} ${textColor} hover:bg-white hover:text-primary`}
      >
        <div>{children}</div>
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default SideItem;
