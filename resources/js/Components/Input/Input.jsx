import React, { useEffect, useRef } from 'react';

export default function Input({
  type = 'text',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
  disabled = false,
  style={}
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        className={
          `custom-input-user border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
          className
        }
        style={style}
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
