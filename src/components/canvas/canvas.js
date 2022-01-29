import React, { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import useInterval from '../../hooks/useInterval';
import defaultGrid from '../../utils';

const Canvas = ({
  grid,
  setGrid,
  setGenCount,
  setAliveCount,
  start,
  speed,
  cellSize,
  gridGap,
  windowSize,
}) => {
  const canvasRef = useRef(null);

  //standard throughout document = grid[x][y]
  //x representing entire horizontal row. y representing vertical value in row.

  function countNeighbors(indexX, indexY) {
    // starts on x in row -1,-1
    // xoo
    // oXo continue on x,y = 0
    // ooo
    let num = 0;
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (x === 0 && y === 0) {
          continue;
        }
        const column = (indexX + x + grid.length) % grid.length;
        const row = (indexY + y + grid[0].length) % grid[0].length;

        if (
          column >= 0 &&
          row >= 0 &&
          column < grid.length &&
          row < grid[0].length
        ) {
          const currentNeighbour = grid[column][row];
          num += currentNeighbour;
        }
      }
    }
    return num;
  }

  function updateCell(x, y, value) {
    setGrid((gridCopy) =>
      gridCopy.map((row, index) =>
        index !== x
          ? row
          : row.map((cell, index) => (index !== y ? cell : value))
      )
    );
  }

  function nextGen() {
    setGrid((gridCopy) => {
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          const cell = grid[x][y];
          const neighbors = countNeighbors(x, y);
          // rules
          if (cell === 1 && neighbors < 2) {
            updateCell(x, y, 0);
          } else if (cell === 1 && neighbors > 3) {
            updateCell(x, y, 0);
          } else if (cell === 0 && neighbors === 3) {
            updateCell(x, y, 1);
          }
        }
      }
      return gridCopy;
    });
    setGenCount((prevValue) => prevValue + 1);
  }

  function drawGrid(grid, ctx) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const coordX = y * cellSize + y;
        const coordY = x * (cellSize + gridGap);
        ctx.fillStyle = grid[x][y] === 1 ? '#61dafb' : '#393e46';
        ctx.fillRect(coordX, coordY, cellSize, cellSize);
      }
    }
  }

  function handleClick(e) {
    const x = Math.floor(e.pageY / (cellSize + gridGap));
    const y = Math.floor(e.pageX / (cellSize + gridGap));
    const cellValue = grid[x][y] ? 0 : 1;
    updateCell(x, y, cellValue);
  }

  function decreaseGrid() {
    const newGrid = defaultGrid(windowSize, gridGap, cellSize);
    setGrid((gridCopy) => {
      let oldGrid = [...gridCopy];

      //remove values from rows
      oldGrid = oldGrid.map((x) => {
        const newRow = [...x];
        let rotate = true;
        while (newRow.length !== newGrid[0].length) {
          if (rotate) newRow.shift();
          if (!rotate) newRow.pop();
          rotate = !rotate;
        }
        return newRow;
      });

      //remove excess rows
      let rotate = true;
      while (oldGrid.length !== newGrid.length) {
        if (rotate) oldGrid.shift();
        if (!rotate) oldGrid.pop();
        rotate = !rotate;
      }
      return oldGrid;
    });
  }

  function increaseGrid() {
    const newGrid = defaultGrid(windowSize, gridGap, cellSize);
    setGrid((gridCopy) => {
      let oldGrid = [...gridCopy];

      //add values to rows
      oldGrid = oldGrid.map((x) => {
        const newRow = [...x];
        let rotate = true;
        while (newRow.length !== newGrid[0].length) {
          if (rotate) newRow.unshift(0);
          if (!rotate) newRow.push(0);
          rotate = !rotate;
        }
        return newRow;
      });

      //add entire rows
      let rotate = true;
      while (oldGrid.length !== newGrid.length) {
        if (rotate) oldGrid.unshift(new Array(newGrid[0].length).fill(0));
        if (!rotate) oldGrid.push(new Array(newGrid[0].length).fill(0));
        rotate = !rotate;
      }

      return oldGrid;
    });
  }

  function handleResize() {
    const newGrid = defaultGrid(windowSize, gridGap, cellSize);
    if (grid.length < newGrid.length || grid[0].length < newGrid[0].length) {
      increaseGrid();
    }
    if (grid.length > newGrid.length || grid[0].length > newGrid[0].length) {
      decreaseGrid();
    }
  }

  useEffect(() => {
    const template = defaultGrid(windowSize, gridGap, cellSize);
    if (
      grid.length !== template.length ||
      grid[0].length !== template[0].length
    ) {
      handleResize();
    }
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    drawGrid(grid, ctx);
  });

  useEffect(() => {
    const count = grid.flat().filter((num) => num === 1).length;
    setAliveCount(count);
  }, [grid, setAliveCount]);

  useInterval(() => nextGen(), start ? speed : null);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleClick}
      />
    </>
  );
};

export default Canvas;
