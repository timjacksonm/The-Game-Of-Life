import React from 'react';

const Menu = ({ children }) => {
  const [generationCount, alive, ...rest] = children;
  return (
    <nav className="z-10 absolute w-1/5 h-1/5 rounded-md flex flex-col justify-center bg-gray-800 m-auto left-0 right-0 zoom90:text-lg zoom80:text-xl zoom75:text-2xl zoom50:text-4xl zoom33:text-5xl zoom25:text-6xl">
      <div className="flex justify-around h-1/2">
        {generationCount}
        {alive}
      </div>

      <div className="flex justify-around h-1/2">{rest}</div>
    </nav>
  );
};

export default Menu;
