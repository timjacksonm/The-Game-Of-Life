import React from 'react';
import { useGrid } from '../hooks';
import './styles.css';

const Grid = ({ start, rows, columns }) => {
  const { array, defineCell } = useGrid(rows, columns);

  return (
    <div
      className="container"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {array.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return (
            <div
              className={cell === 0 ? 'cell' : 'cell active'}
              key={`${rowIndex}${cellIndex}`}
              id={`${rowIndex} ${cellIndex}`}
              onClick={defineCell}
            ></div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
