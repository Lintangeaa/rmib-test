import React from 'react';

const Badge = ({ variant, text }) => {
  let style = '';

  if (variant === 'green') {
    style = 'bg-green-500 text-green-500 border-green-500';
  } else if (variant === 'red') {
    style = 'bg-red-500 text-red-500 border-red-500';
  } else if (variant === 'blue') {
    style = 'bg-blue-300 text-primary border-primary';
  }
  return (
    <div
      className={`px-2 p-1 flex justify-center max-w-[140px]  min-w-[60px] bg-opacity-30 hover:bg-opacity-40 rounded-xl border text-xs ${style}`}
    >
      {text}
    </div>
  );
};

export default Badge;
