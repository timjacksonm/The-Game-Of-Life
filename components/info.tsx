import React from 'react';
import Tips from './tips';
import Favorites from './favorites';

function Info() {
  return (
    <div className='flex h-full flex-col overflow-y-auto p-3'>
      <h1 className='w-full border-b-2 border-t-2 border-gray-400 p-3 text-center font-bold'>
        Tips
      </h1>
      <Tips />
      <h1 className='w-full border-b-2 border-t-2 border-gray-400 p-3 text-center font-bold'>
        Favorites
      </h1>
      <Favorites />
    </div>
  );
}

export default Info;
