import React, { useState } from 'react';
import { useGetPatternNamesQuery } from '../../services/gameoflifeapi';
import { v4 as uuidv4 } from 'uuid';

const TemplateList = () => {
  const { data, isFetching } = useGetPatternNamesQuery();
  console.log(data);
  if (isFetching) return 'Loading...';
  return (
    <div>
      {data.map((template) => (
        <div key={uuidv4()}>
          <div>{template._id}</div>
          <div>{template.title}</div>
        </div>
      ))}
    </div>
  );
};

const Menu = ({ children }) => {
  const [generationCount, alive, ...rest] = children;
  return (
    <menu className="z-10 absolute min-w-fit w-1/5 rounded-md flex flex-col  bg-gray-800 ml-auto mr-auto left-0 right-0 p-3">
      <div className="flex justify-around">
        {generationCount}
        {alive}
      </div>

      <div className="flex justify-around">{rest}</div>
    </menu>
  );
};

export default Menu;
