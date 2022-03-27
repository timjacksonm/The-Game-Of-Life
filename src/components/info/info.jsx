import React from 'react';
import Favorites from '../favorites/favorites';
import Tips from '../tips/tips';

function Info() {
  return (
    <div className="p-3 flex flex-col h-full overflow-y-auto">
      <h1 className="w-full text-center font-bold border-gray-400 border-t-2 border-b-2 p-3">
        Tips
      </h1>
      <Tips />
      <h1 className="w-full text-center font-bold border-gray-400 border-t-2 border-b-2 p-3">
        Favorites
      </h1>
      <Favorites />
    </div>
  );
}

export default Info;
