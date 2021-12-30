import { useState, useEffect } from 'react';
import { create2dArray } from './helperFunctions';

export function useGrid(rows, columns) {
  const [array, setArray] = useState(create2dArray(rows, columns));

  const defineCell = (e) => {
    const { row, column } = {
      row: e.target.id.split(' ')[0],
      column: e.target.id.split(' ')[1],
    };
    const arr = [...array];
    arr[row][column] = e.target.className === 'cell' ? 1 : 0;
    setArray(arr);
  };

  useEffect(() => {
    if (rows > 4) {
      const arrCopy = array;
      const rowsToAdd = (rows - arrCopy.length) / 2;
      const columnsToAdd = (columns - arrCopy.length) / 2;
      // modify array copy
      for (let i = 0; i < arrCopy.length; i++) {
        //row to modify
        arrCopy[i] = [
          ...new Array(columnsToAdd).fill(0),
          ...arrCopy[i],
          ...new Array(columnsToAdd).fill(0),
        ];
      }
      //add new rows
      for (let i = 0; i < rowsToAdd; i++) {
        arrCopy.unshift(new Array(Number(columns)).fill(0));
      }
      for (let i = 0; i < rowsToAdd; i++) {
        arrCopy.push(new Array(Number(columns)).fill(0));
      }
      setArray(arrCopy);
    } else {
      setArray(create2dArray(rows, columns));
    }
  }, [rows, columns]);

  return { array: array, defineCell: defineCell };
}
