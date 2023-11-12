import React from 'react';
import example1 from '@/assets/examplegif1.gif';
import example2 from '@/assets/examplegif2.gif';
import example3 from '@/assets/examplegif3.gif';
import example4 from '@/assets/examplegif4.gif';
import Image from 'next/image';

const Rules = () => {
  const rulesDescription = [
    {
      paragraph:
        'The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.',
      key: 0,
    },
    {
      paragraph:
        'The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead.',
      key: 1,
    },
    {
      paragraph:
        'Every cell interacts with its eight neighbours and follows a set of 4 rules to determine the cells status, live or dead.',
      key: 2,
    },
  ];
  const rulesList = [
    {
      description:
        '1.) Any live cell with fewer than two live neighbours dies, as if by underpopulation.',
      gif: example1,
      key: 0,
    },
    {
      description:
        '2.) Any live cell with two or three live neighbours lives on to the next generation.',
      gif: example2,
      key: 1,
    },
    {
      description:
        '3.) Any live cell with more than three live neighbours dies, as if by overpopulation.',
      gif: example3,
      key: 2,
    },
    {
      description:
        '4.) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.',
      gif: example4,
      key: 3,
    },
  ];
  return (
    <div className='flex h-screen flex-col pt-3'>
      <div className='zoom80:m-6 zoom50:m-12 zoom33:m-16 zoom25:m-20 m-3'>
        {rulesDescription.map((element) => (
          <p key={element.key} className='zoom75:py-3 py-1'>
            {element.paragraph}
          </p>
        ))}
      </div>
      <ol className='h-full divide-y divide-gray-400 overflow-y-scroll border-t-4 border-gray-400 p-5'>
        {rulesList.map((rule) => (
          <li
            key={rule.key}
            className='zoom80:m-6 zoom50:m-12 zoom33:m-16 zoom25:m-20 flex flex-col items-center justify-around last:mb-16'
          >
            <p className='zoom75:my-6 zoom50:my-9 zoom25:my-12 my-3'>{rule.description}</p>
            <Image
              className='w-2/6 p-3'
              src={rule.gif}
              alt='gif showcasing this rule being applied to a cell'
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Rules;
