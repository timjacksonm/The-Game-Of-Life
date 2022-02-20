import React from 'react';

const Menu = ({ children }) => {
  const [generationCount, alive, ...rest] = children;
  return (
    <nav className="z-10 absolute min-w-fit w-1/5 rounded-md flex flex-col bg-gray-800 ml-auto mr-auto left-0 right-0 p-3">
      <div className="flex justify-around">
        {generationCount}
        {alive}
      </div>

      <div className="flex justify-around">{rest}</div>
    </nav>
  );
};

export default Menu;
