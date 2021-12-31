import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { useImmer } from "use-immer";
import { useGrid } from "../hooks";
import { create2dArray } from "../helperFunctions";
import "./styles.css";

const Grid = ({ status, rows, columns }) => {
  const [array, setArray] = useImmer([]);

  const defineCell = (e) => {
    const { row, column } = {
      row: e.target.id.split(" ")[0],
      column: e.target.id.split(" ")[1],
    };
    setArray((prevValue) => {
      prevValue[row][column] = e.target.className === "cell" ? 1 : 0;
    });
  };
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
    const start = (template.length - array.length) / 2;
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
              className={cell === 0 ? "cell" : "cell active"}
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
