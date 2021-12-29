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
    setArray(create2dArray(rows, columns));
  }, [rows, columns]);

  return { array: array, defineCell: defineCell };
}
