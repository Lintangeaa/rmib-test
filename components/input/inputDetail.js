import React from 'react';

const InputDetail = ({
  title,
  type,
  placeholder,
  classname,
  value,
  onChange,
  disabled,
}) => {
  let style = '';

  if (disabled) {
    style = 'bg-orange-500 text-orange-500 border-orange-500';
  } else if (!disabled) {
    style = 'bg-blue-300 text-primary border-primary';
  }

  return (
    <div className={`flex ${classname}`}>
      <span className="w-1/3 text-sm ">{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-2/3 px-2 rounded-xl border  ${style} bg-opacity-30 `}
        value={value}
        onChange={onChange}
        disabled={!disabled}
      />
    </div>
  );
};

export default InputDetail;
