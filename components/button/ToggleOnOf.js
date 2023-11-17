import React from 'react';

const ToggleOnOf = ({ title, status, onClick }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">{title}</span>
      <div
        onClick={onClick}
        className={`w-8 h-4  rounded-full flex items-center cursor-pointer ${
          status ? 'bg-orange-400' : 'bg-primary'
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
            status ? 'translate-x-4' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleOnOf;
