import React, { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import useInterval from './hooks/useInterval';

const App = () => {
  const canvasRef = useRef(null);
  const cellSize = 15;
  const gridGap = 1;

  const [start, setStart] = useState(false);

  const [rows, setRows] = useState(
    Math.floor((window.innerWidth + gridGap) / (cellSize + gridGap))
  );
  const [cols, setCols] = useState(
    Math.floor((window.innerHeight + gridGap) / (cellSize + gridGap))
  );

  const [grid, setGrid] = useImmer(
    new Array(cols)
      .fill(0)
      .map(() =>
        new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
      )
  );

  function nextGen(grid) {
    const gridCopy = grid.map((arr) => [...arr]);

    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        const cell = grid[col][row];
        let numNeighbours = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const x_cell = col + i;
            const y_cell = row + j;

            if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
              const currentNeighbour = grid[col + i][row + j];
              numNeighbours += currentNeighbour;
            }
          }
        }

        // rules
        if (cell === 1 && numNeighbours < 2) {
          gridCopy[col][row] = 0;
        } else if (cell === 1 && numNeighbours > 3) {
          gridCopy[col][row] = 0;
        } else if (cell === 0 && numNeighbours === 3) {
          gridCopy[col][row] = 1;
        }
      }
    }
    setGrid(gridCopy);
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

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(grid, ctx);
  }, [grid]);

  useInterval(() => nextGen(grid), start ? 50 : null);

  return (
    <>
      <button style={{ position: 'absolute' }} onClick={() => setStart(!start)}>
        {start ? 'Stop' : 'Start'}
      </button>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(e) => {
          console.log(e);
        }}
      />
    </>
  );
};

export default App;
