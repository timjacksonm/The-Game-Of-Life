import React from 'react';

function Tips() {
  const tipList = [
    {
      description: '1.) To load a pattern, go into options and apply a pattern and click the grid!',
    },
    {
      description:
        '2.) To remove a loaded pattern from the cursor without opening the options menu, just right click on the grid.',
    },
    {
      description:
        '3.) The grid is now resizable! Just click and drag to pan and zoom in and out with your mouse wheel.',
    },
    {
      description:
        '4.) Available patterns are listed from the smallest size to the largest. So scroll down to view larger patterns. Search filters are coming soon.',
    },
    {
      description:
        '5.) There are three types of patterns that show up frequently in the game of life.',
      list: [
        '- Still life: A pattern that does not change from one generation to the next.',
        '- Oscilator: A pattern that returns to its original state, in the same orientation and position, after a finite number of generations.',
        '- Spaceship: A pattern that reappears after a certain number of generations in the same orientation but in a different position.',
      ],
    },
    {
      description:
        '6.) Fun Fact: The simplest still lifes and oscillators were discovered while tracking the fates of various small starting configurations using graph paper, blackboards, and physical game boards.',
    },
  ];
  return (
    <div>
      <ul>
        {tipList.map((data, index) => (
          <div key={index} className='p-3'>
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
