import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { useImmer } from 'use-immer';
import { create2dArray } from '../../helperFunctions';
import './styles.css';

let intervalId;

const Grid = ({
  start,
  setStart,
  wasRunning,
  setWasRunning,
  rows,
  columns,
}) => {
  const [array, setArray] = useImmer([]);

  function defineCell(e) {
    const { row, column } = {
      row: e.target.id.split(' ')[0],
      column: e.target.id.split(' ')[1],
    };
    setArray((prevValue) => {
      prevValue[row][column] = e.target.className === 'cell' ? 1 : 0;
    });
  }

  function increaseSize(template) {
    const start = (template.length - array.length) / 2;
    for (let i = 0; i < template.length; i++) {
      if (start + array.length === i) {
        break;
      }
      if (i >= start) {
        template[i].splice(start, array.length, ...array[i - start]);
      }
    }
    setArray(template);
  }

  function decreaseSize(template) {
    setArray((prevValue) => {
      const arrayCopy = prevValue;
      while (arrayCopy.length > template.length) {
        arrayCopy.pop();
        arrayCopy.shift();
      }
      for (let i = 0; i < arrayCopy.length; i++) {
        while (arrayCopy[i].length > template.length) {
          arrayCopy[i].pop();
          arrayCopy[i].shift();
        }
      }
      return arrayCopy;
    });
  }

  useEffect(() => {
    //on mount fill default grid of rows and columns
    setArray(create2dArray(rows, columns));
  }, []);

  useEffect(() => {
    if (start) {
      setStart(false);
      setWasRunning(true);
    }
    const template = create2dArray(rows, columns);
    //update 2dArray to larger size
    if (array.length < template.length) {
      increaseSize(template);
    }
    //update 2dArray to smaller size
    if (array.length > template.length) {
      decreaseSize(template);
    }
  }, [rows, columns]);

  useEffect(() => {
    if (array && wasRunning) {
      setStart(true);
    }
  }, [array, wasRunning, setStart]);

  function countNeighbors(grid, x, y) {
    let sum = 0;
    // console.log(grid[x][y]);
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        sum +=
          grid[(x + i + Number(columns)) % Number(columns)][
            (y + j + Number(rows)) % Number(rows)
          ];
      }
    }

    sum -= grid[x][y];
    return sum;
  }

  useEffect(() => {
    //start simulation and apply game rules based on speed
    if (start) {
      intervalId = setInterval(() => {
        setArray((prevValue) => {
          //compute next array based on current array
          // next var is a deep clone
          let next = JSON.parse(JSON.stringify(prevValue));
          for (let i = 0; i < prevValue.length; i++) {
            for (let j = 0; j < prevValue[i].length; j++) {
              let state = prevValue[i][j];
              // count live neighbors
              let neighbors = countNeighbors(prevValue, i, j);
              if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
              } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
              } else {
                next[i][j] = state;
              }
            }
          }
          return next;
        });
      }, 500);
    } else {
      clearInterval(intervalId);
    }
  }, [start]);

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
              key={uniqid()}
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
