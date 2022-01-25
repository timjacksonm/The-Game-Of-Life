import React, { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import useInterval from '../../hooks/useInterval';

const Canvas = ({ start, speed, cellSize, gridGap }) => {
  const canvasRef = useRef(null);

  //standard throughout document = grid[x][y]
  //x representing entire horizontal row. y representing vertical value in row.
  const [grid, setGrid] = useState(defaultGrid());

  function defaultGrid() {
    return new Array(
      Math.floor((window.innerHeight + gridGap) / (cellSize + gridGap))
    )
      .fill(0)
      .map(() =>
        new Array(
          Math.floor((window.innerWidth + gridGap) / (cellSize + gridGap))
        ).fill(0)
      );
  }

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

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(grid, ctx);
  }, [grid]);

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
