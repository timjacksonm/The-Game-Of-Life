import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { useImmer } from 'use-immer';
import { useGrid } from '../hooks';
import { create2dArray } from '../helperFunctions';
import './styles.css';

const Grid = ({ status, rows, columns }) => {
  const [array, setArray] = useImmer([]);
  useEffect(() => {
    //on mount fill default grid of rows and columns
    setArray(create2dArray(rows, columns));
  }, []);

  const defineCell = (e) => {
    const { row, column } = {
      row: e.target.id.split(' ')[0],
      column: e.target.id.split(' ')[1],
    };
    setArray((prevValue) => {
      prevValue[row][column] = e.target.className === 'cell' ? 1 : 0;
    });
  };

  function updateSize(template, size) {
    let arrTemplate = template;
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
      setArray(arrTemplate);
    }
    //update 2dArray to smaller size
    if (array.length > arrTemplate.length) {
      setArray((prevValue) => {
        const arrayCopy = prevValue;
        while (arrayCopy.length > size) {
          arrayCopy.pop();
          arrayCopy.shift();
        }
        for (let i = 0; i < arrayCopy.length; i++) {
          while (arrayCopy[i].length > size) {
            arrayCopy[i].pop();
            arrayCopy[i].shift();
          }
        }
        return arrayCopy;
      });
    }
  }

  useEffect(() => {
    //if template slice into current size
    updateSize(create2dArray(rows, columns), rows);
  }, [rows, columns]);

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
