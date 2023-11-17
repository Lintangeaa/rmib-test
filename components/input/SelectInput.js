import React from 'react';

const SelectInput = ({ title, value, onChange, options }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="selectInput" className="mb-1 text-sm text-primary">
        {title}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="max-w-xl p-1 text-xs bg-blue-300 border bg-opacity-30 border-primary text-primary rounded-xl "
        id="selectInput"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
