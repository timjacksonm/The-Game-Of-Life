import React from 'react';

const Button = ({ children, name, color, clickHanlder, disabled }) => {
  return (
    <button
      className={`${color} w-full font-bold flex justify-center items-center rounded-md hover:text-white hover:bg-gray-700 disabled:text-slate-500`}
      onClick={clickHanlder}
      disabled={disabled}
    >
      {children}
      <p className="ml-2 zoom50:ml-4">{name}</p>
    </button>
  );
};

export default Button;
