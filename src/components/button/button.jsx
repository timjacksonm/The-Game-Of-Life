import React from 'react';

const Button = ({ children, name, color, clickHanlder }) => {
  return (
    <button
      className={`${color} w-full font-bold flex justify-center items-center rounded-md hover:text-white hover:bg-gray-700`}
      onClick={clickHanlder}
    >
      {children}
      <p className="ml-2">{name}</p>
    </button>
  );
};

export default Button;
