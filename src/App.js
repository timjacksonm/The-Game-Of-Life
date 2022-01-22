import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const cellSize = 15;
  const gridGap = 1;

  const [rows, setRows] = useState(
    Math.floor((window.innerWidth + gridGap) / (cellSize + gridGap))
  );
  const [cols, setCols] = useState(
    Math.floor((window.innerHeight + gridGap) / (cellSize + gridGap))
  );

  const defaultGrid = new Array(cols)
    .fill(0)
    .map(() =>
      new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
    );

  function drawGrid(grid, ctx) {
    for (let i = 0; i < grid.length; i++) {
      for (let k = 0; k < grid[i].length; k++) {
        const x = k * cellSize + k;
        const y = i * (cellSize + gridGap);
        ctx.fillStyle = grid[i][k] === 1 ? '#00adb5' : '#393e46';
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    drawGrid(defaultGrid, ctx);
  });
  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default App;
