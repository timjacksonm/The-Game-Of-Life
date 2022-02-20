import React from 'react';
import example1 from '../../assets/examplegif1.gif';
import example2 from '../../assets/examplegif2.gif';
import example3 from '../../assets/examplegif3.gif';
import example4 from '../../assets/examplegif4.gif';

const Rules = () => {
  return (
    <div className="p-3 flex flex-col">
      <h1>
        <b>Rules:</b>
      </h1>
      <ol className="divide-y divide-gray-400">
        <li className="py-3">
          <b>1.)</b> Any live cell with fewer than two live neighbours dies, as
          if by underpopulation.
          <img
            className="m-auto p-3"
            src={example1}
            alt="test"
            width="175px"
            height="175px"
          />
        </li>
        <li className="py-3">
          <b>2.)</b> Any live cell with two or three live neighbours lives on to
          the next generation.
          <img
            className="m-auto p-3"
            src={example2}
            alt="test"
            width="175px"
            height="175px"
          />
        </li>
        <li className="py-3">
          <b>3.)</b> Any live cell with more than three live neighbours dies, as
          if by overpopulation.
          <img
            className="m-auto p-3"
            src={example3}
            alt="test"
            width="175px"
            height="175px"
          />
        </li>
        <li className="py-3">
          <b>4.)</b> Any dead cell with exactly three live neighbours becomes a
          live cell, as if by reproduction.
          <img
            className="m-auto p-3"
            src={example4}
            alt="test"
            width="175px"
            height="175px"
          />
        </li>
      </ol>
    </div>
  );
};

export default Rules;
