import React from 'react';
import uniqid from 'uniqid';
import './styles.css';

const Grid = ({ array, modifyClickedCell, gridSize }) => {
  return (
    <div
      className="container"
      style={{
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {array.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return (
            <div
              className={cell === 0 ? 'cell' : 'cell active'}
              key={uniqid()}
              id={`${rowIndex} ${cellIndex}`}
              onClick={modifyClickedCell}
            ></div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
