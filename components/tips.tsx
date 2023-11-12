import React from 'react';

function Tips() {
  const tipList = [
    {
      description: '1.) To load a pattern go into options and apply a pattern to your mouse!',
      key: 0,
    },
    {
      description:
        '2.) To remove a loaded pattern from cursor without opening the options menu just right click on the grid.',
      key: 1,
    },
    {
      description:
        '3.) There are three types of patterns that show up frequently in the game of life.',
      list: [
        '- Still life: A pattern that does not change from one generation to the next.',
        '- Oscilator: A pattern that returns to its original state, in the same orientation and position, after a finite number of generations.',
        '- Spaceship: A pattern that reappears after a certain number of generations in the same orientation but in a different position.',
      ],
      key: 2,
    },
    {
      description:
        '4.) Available patterns are listed from smallest size to the largest. So scroll down to view larger patterns or apply a filter.',
      key: 3,
    },
    {
      description:
        '5.) Fun Fact: The simplest still lifes and oscillators were discovered while tracking the fates of various small starting configurations using graph paper, blackboards, and physical game boards.',
      key: 4,
    },
  ];
  return (
    <div>
      <ul>
        {tipList.map((data) => (
          <div
            key={data.key}
            className='zoom80:m-6 zoom50:m-12 zoom33:m-16 zoom25:m-20 zoom75:p-6 zoom50:p-9 zoom25:p-12 p-3'
          >
            {data.description}
            {data.list && (
              <ul className='p-1'>
                {data.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Tips;
