import React from 'react';
import Tips from './tips';
import { FaGithub } from 'react-icons/fa';

function Info() {
  return (
    <div className='flex h-full flex-col overflow-y-auto p-3'>
      <h1 className='w-full border-y-2 border-gray-400 p-3 text-center font-bold'>Tips</h1>
      <Tips />
      <h1 className='w-full border-y-2 border-gray-400 p-3 text-center font-bold'>Credits</h1>
      <div className='p-2'>
        <a
          href='https://github.com/timjacksonm/The-Game-Of-Life'
          className='flex items-center text-lg hover:text-blue-500'
        >
          Created by: <FaGithub className='mx-2' size='1.5em' />
          timjacksonm
        </a>

        <a
          href='https://conwaylife.com/wiki'
          className='flex items-center text-lg hover:text-blue-500'
        >
          Patterns from: https://conwaylife.com/wiki
        </a>
      </div>
    </div>
  );
}

export default Info;
