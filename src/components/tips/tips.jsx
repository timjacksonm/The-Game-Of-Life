import React from 'react';

function Tips() {
  const tipList = [
    {
      description:
        '1.) If a loaded pattern is to large. Zoom out by pressing Ctrl + Mouswheel Down or Ctrl + MINUS',
      key: 0,
    },
    {
      description:
        '2.) There are three pattern types that show up frequenctly in the game of life.',
      list: [
        '- Still lifes: A pattern that does not change from one generation to the next.',
        '- Oscilators: A pattern that returns to its original state, in the same orientation and position, after a finite number of generations.',
        '- Spaceships: A pattern that reappears after a certain number of generations in the same orientation but in a different position.',
      ],
      key: 1,
    },
    {
      description:
        '3.) Fun Fact: The simplest still lifes and oscillators were discovered while tracking the fates of various small starting configurations using graph paper, blackboards, and physical game boards.',
      key: 2,
    },
  ];
  return (
    <div className="p-3 flex flex-col h-screen">
      <ol className="divide-y divide-gray-400 h-full p-5">
        {tipList.map((data) => (
          <div className="p-3 zoom80:m-6 zoom50:m-12 zoom33:m-16 zoom25:m-20 zoom75:p-6 zoom50:p-9 zoom25:p-12">
            {data.description}
            {data.list && (
              <ul className="p-1">
                {data.list.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ol>
    </div>
  );
}

export default Tips;
