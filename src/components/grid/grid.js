import React, { useState, useEffect } from 'react';
import { useGrid } from '../hooks';
import { create2dArray } from '../helperFunctions';
import './styles.css';

const Grid = ({ status, rows, columns }) => {
  //20 different sizes. 80 cap. 4 interval

  //on vars change update grid with additional rows columns
  const [array, setArray] = useState([]);
  useEffect(() => {
    //on mount fill default grid of rows and columns
    setArray(create2dArray(rows, columns));
  }, []);

  const defineCell = (e) => {
    const { row, column } = {
      row: e.target.id.split(' ')[0],
      column: e.target.id.split(' ')[1],
    };
    const arr = [...array];
    arr[row][column] = e.target.className === 'cell' ? 1 : 0;
    setArray(arr);
  };

  function updateSize(template, size) {
    const arrTemplate = template;
    const start = (arrTemplate.length - array.length) / 2;

    //update 2dArray to larger size
    if (array.length < arrTemplate.length) {
      for (let i = 0; i < arrTemplate.length; i++) {
        if (start + array.length === i) {
          break;
        }
        if (i >= start) {
          arrTemplate[i].splice(start, array.length, ...array[i - start]);
        }
      }
    }
    //update 2dArray to smaller size
    if (array.length > arrTemplate.length) {
      //To Be Implemented
    }
    setArray(arrTemplate);
  }

  useEffect(() => {
    console.log('rows,columns updated');
    //if template slice into current size
    switch (rows) {
      case '4':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '8':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '12':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '16':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '20':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '24':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '28':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '32':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '36':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '40':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '44':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '48':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '52':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '56':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '60':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '64':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '68':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '72':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '76':
        updateSize(create2dArray(rows, columns), rows);
        break;
      case '80':
        updateSize(create2dArray(rows, columns), rows);
        break;
      default:
        break;
    }
  }, [rows, columns]);

  // const { array, defineCell } = useGrid(rows, columns);
  // const create2dArray = (rows, columns) => {
  //   const myArray = [];

  //   for (let i = 0; i < rows; i++) {
  //     myArray[i] = [];
  //     for (let j = 0; j < columns; j++) {
  //       myArray[i][j] = 0;
  //     }
  //   }
  //   return myArray;
  // };
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
