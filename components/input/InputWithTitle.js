import React from 'react';

const InputWithTitle = ({
  title,
  type,
  placeholder,
  classname,
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className={`flex flex-col ${classname}`}>
      <span className="text-sm text-primary">{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 px-2 border-b"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputWithTitle;
