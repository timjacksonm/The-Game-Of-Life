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
  return (
    <div className="absolute w-1/2 m-auto bg-cyan-300 ml-auto mr-auto left-0 right-0 p-3">
      {children}
    </div>
  );
};

export default Menu;
