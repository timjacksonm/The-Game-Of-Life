import React from 'react';
import example1 from '../../assets/examplegif1.gif';
import example2 from '../../assets/examplegif2.gif';
import example3 from '../../assets/examplegif3.gif';
import example4 from '../../assets/examplegif4.gif';

const Rules = () => {
  return (
    <>
      <h1>Rules:</h1>
      <p>
        1. Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
      </p>
      <img src={example1} alt="test" />
      <p>
        2. Any live cell with two or three live neighbours lives on to the next
        generation.
      </p>
      <img src={example2} alt="test" />
      <p>
        3. Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </p>
      <img src={example3} alt="test" />
      <p>
        4. Any dead cell with exactly three live neighbours becomes a live cell,
        as if by reproduction.
      </p>
      <img src={example4} alt="test" />
    </>
  );
};

export default Rules;
