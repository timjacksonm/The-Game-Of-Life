import React, { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import useInterval from '../../hooks/useInterval';

const Canvas = ({ start, speed, cellSize, gridGap }) => {
  const canvasRef = useRef(null);
  const [rows, setRows] = useState(
    Math.floor((window.innerWidth + gridGap) / (cellSize + gridGap))
  );
  const [cols, setCols] = useState(
    Math.floor((window.innerHeight + gridGap) / (cellSize + gridGap))
  );
  const [grid, setGrid] = useImmer(
    new Array(cols).fill(0).map(
      () => new Array(rows).fill(0)
      // .map(() => Math.floor(Math.random() * 2))
    )
  );

  function countNeighbors(i, j) {
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
        const column = (i + x + cols) % cols;
        const row = (j + y + rows) % rows;

        if (column >= 0 && row >= 0 && column < cols && row < rows) {
          const currentNeighbour = grid[column][row];
          num += currentNeighbour;
        }
      }
    }
    return num;
  }

  function nextGen() {
    setGrid((gridCopy) => {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          const cell = grid[i][j];
          const neighbors = countNeighbors(i, j);
          // rules
          if (cell === 1 && neighbors < 2) {
            gridCopy[i][j] = 0;
          } else if (cell === 1 && neighbors > 3) {
            gridCopy[i][j] = 0;
          } else if (cell === 0 && neighbors === 3) {
            gridCopy[i][j] = 1;
          }
        }
      }
      return gridCopy;
    });
  }

  function drawGrid(grid, ctx) {
    for (let i = 0; i < grid.length; i++) {
      for (let k = 0; k < grid[i].length; k++) {
        const x = k * cellSize + k;
        const y = i * (cellSize + gridGap);
        ctx.fillStyle = grid[i][k] === 1 ? '#61dafb' : '#393e46';
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }

  function handleClick(e) {
    const x = Math.floor(e.pageX / (cellSize + gridGap));
    const y = Math.floor(e.pageY / (cellSize + gridGap));
    setGrid((gridCopy) => {
      let status = gridCopy[y][x] ? 0 : 1;
      gridCopy[y][x] = status;
      return gridCopy;
    });
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
