import React from 'react';
import example1 from '../../assets/examplegif1.gif';
import example2 from '../../assets/examplegif2.gif';
import example3 from '../../assets/examplegif3.gif';
import example4 from '../../assets/examplegif4.gif';

const Rules = () => {
  const rulesList = [
    {
      description:
        'Any live cell with fewer than two live neighbours dies, as if by underpopulation.',
      gif: example1,
      key: 0,
    },
    {
      description:
        'Any live cell with two or three live neighbours lives on to the next generation.',
      gif: example2,
      key: 1,
    },
    {
      description:
        'Any live cell with more than three live neighbours dies, as if by overpopulation.',
      gif: example3,
      key: 2,
    },
    {
      description:
        'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.',
      gif: example4,
      key: 3,
    },
  ];
  return (
    <div className="p-3 flex flex-col h-screen">
      <ol className="list-decimal divide-y divide-gray-400 h-full p-5 overflow-y-scroll">
        {rulesList.map((rule) => {
          return (
            <li key={rule.key} className="last:mb-16">
              <p className="my-3">{rule.description}</p>
              <img
                className="m-auto my-3"
                src={rule.gif}
                alt="test"
                width="175px"
                height="175px"
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Rules;
