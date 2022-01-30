import React, { useEffect } from 'react';

const Details = ({ selected }) => {
  useEffect(() => {
    //get selected patterns details by id
  }, [selected]);

  return (
    <div className="h-1/3 flex flex-col items-center p-3">
      <h1 className="font-bold">Details</h1>
      <div className="bg-gray-600 w-full h-full p-3 overflow-y-auto">
        <h2>Total Wikicollection patterns: {1}</h2>
        <h2>Total Customcollection patterns: {1}</h2>
        <div className="py-3">
          <h1 className="font-bold">Selected Pattern</h1>
          <h2>Title: {}</h2>
          <h2>Author: {}</h2>
          <h3>Description: {}</h3>
        </div>
      </div>
    </div>
  );
};

export default Details;
