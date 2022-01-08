import { useState, useEffect } from 'react';
import { create2dArray } from '../helperFunctions';
import { useImmer } from 'use-immer';

export function useArray(defaultValue) {
  const [array, setArray] = useImmer(defaultValue);

  function clear(gridSize) {
    setArray(create2dArray(gridSize, gridSize));
  }

  function modifyClickedCell(event) {
    const { row, column } = {
      row: event.target.id.split(' ')[0],
      column: event.target.id.split(' ')[1],
    };
    setArray((prevValue) => {
      prevValue[row][column] = event.target.className === 'cell' ? 1 : 0;
    });
  }

  function increaseSize(newValue) {
    const template = create2dArray(newValue, newValue);
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

  function decreaseSize(newValue) {
    const template = create2dArray(newValue, newValue);
    setArray((prevValue) => {
      const arrayCopy = JSON.parse(JSON.stringify(prevValue));
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

  function countNeighbors(grid, x, y, rows, columns) {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const row = (x + i + Number(columns)) % Number(columns);
        const column = (y + j + Number(rows)) % Number(rows);
        sum += grid[row][column];
      }
    }

    sum -= grid[x][y];
    return sum;
  }

  function createNext2dArray(rows, columns) {
    setArray((prevValue) => {
      // next variable is a deep clone of current array
      let next = JSON.parse(JSON.stringify(prevValue));

      for (let i = 0; i < prevValue.length; i++) {
        for (let j = 0; j < prevValue[i].length; j++) {
          let state = prevValue[i][j];

          // count live neighbors
          let neighbors = countNeighbors(prevValue, i, j, rows, columns);

          //apply game of life rules to deep clone array
          if (state === 0 && neighbors === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
          } else {
            next[i][j] = state;
          }
        }
      }
      return next;
    });
  }

  function saveTemplate(array) {
    //save template to db
  }

  function loadTemplate(array) {
    setArray(array);
  }

  return {
    array,
    saveTemplate,
    loadTemplate,
    modifyClickedCell,
    increaseSize,
    decreaseSize,
    createNext2dArray,
    clear,
  };
}
