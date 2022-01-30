import React from 'react';

const Button = ({ children, name, color, clickHanlder }) => {
  return (
    <button
      className={`${color} font-bold py-2 px-4 m-auto inline-flex items-center rounded-md hover:text-white hover:bg-gray-700`}
      onClick={clickHanlder}
    >
      {children}
      <p className="w-16 px-1">{name}</p>
    </button>
  );
};

export default Button;
