import React from 'react';
import example1 from '../../assets/examplegif1.gif';
import example2 from '../../assets/examplegif2.gif';
import example3 from '../../assets/examplegif3.gif';
import example4 from '../../assets/examplegif4.gif';

const Rules = () => {
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
    <div className="p-3 flex flex-col h-screen">
      <ol className="divide-y divide-gray-400 h-full overflow-y-scroll p-5">
        {rulesList.map((rule) => {
          return (
            <li
              key={rule.key}
              className="flex flex-col items-center justify-around last:mb-16 h-2/5 zoom80:m-6 zoom50:m-12 zoom33:m-16 zoom25:m-20"
            >
              <p className="my-3 zoom75:my-6 zoom50:my-9 zoom25:my-12">
                {rule.description}
              </p>
              <img className="w-2/5" src={rule.gif} alt="test" />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Rules;
