import React from "react"

const InputWithTitle = ({
  title,
  type,
  placeholder,
  classname,
  value,
  onChange,
}) => {
  return (
    <div className={`flex flex-col ${classname}`}>
      <span className="font-semibold text-white">{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 px-2 rounded-md "
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputWithTitle
