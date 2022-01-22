import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const cellSize = 16;
  const gridGap = 1;

  const [rows, setRows] = useState(
    Math.floor((window.innerWidth + gridGap) / (cellSize + gridGap))
  );
  const [cols, setCols] = useState(
    Math.floor((window.innerHeight + gridGap) / (cellSize + gridGap))
  );

  const defaultGrid = new Array(cols)
    .fill(0)
    .map(() => new Array(rows).fill(0));

  const drawCell = (ctx, cell, index) => {
    const x = index.row * cellSize + index.row;
    const y = index.column * (cellSize + gridGap);
    ctx.fillStyle = cell === 1 ? '#00adb5' : '#393e46';
    ctx.fillRect(x, y, cellSize, cellSize);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    for (let i = 0; i < defaultGrid.length; i++) {
      for (let k = 0; k < defaultGrid[i].length; k++) {
        const cellValue = defaultGrid[i][k];
        drawCell(ctx, cellValue, { column: i, row: k });
      }
    }
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
