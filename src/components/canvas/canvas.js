import React, { useEffect, useRef, useState } from 'react';
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
  brush,
  color,
}) => {
  const canvasRef = useRef(null);
  const [mouseCoords, setMouseCoords] = useState();
  const [liveCoords, setLiveCoords] = useState(() => new Set());

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

  // function handleClick(e) {
  //   if (liveCoords) {
  //     liveCoords.forEach((pair) => {
  //       const cellValue = grid[pair[0]][pair[1]] ? 0 : 1;
  //       updateCell(pair[0], pair[1], cellValue);
  //     });
  //   } else {
  //     const x = Math.floor(e.pageY / (cellSize + gridGap));
  //     const y = Math.floor(e.pageX / (cellSize + gridGap));
  //     const cellValue = grid[x][y] ? 0 : 1;
  //     updateCell(x, y, cellValue);
  //   }
  // }

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

  // function getCoords(array, center) {
  //   const coordArray = [];
  //   for (let x = 0; x < array.length; x++) {
  //     for (let y = 0; y < array[x].length; y++) {
  //       if ([x, y] === center && array[x][y]) {
  //         coordArray.push([x, y]);
  //         continue;
  //       }

  //       if ([x, y] !== center && array[x][y] === 1)
  //         coordArray.push([x - center[0], y - center[1]]);
  //     }
  //   }
  //   return coordArray;
  // }

  // function drawHover(cmx) {
  //   if (liveCoords) {
  //     liveCoords.forEach((pair) => {
  //       const coordX = pair[1] * cellSize + pair[1];
  //       const coordY = pair[0] * (cellSize + gridGap);
  //       cmx.fillStyle = color;
  //       cmx.fillRect(coordX, coordY, cellSize, cellSize);
  //     });
  //   }
  // }

  // function getAlivePairs(mouseX, mouseY) {
  //   if (brush) {
  //     const x = Math.floor(mouseY / (cellSize + gridGap));
  //     const y = Math.floor(mouseX / (cellSize + gridGap));
  //     const brushX = Math.floor(brush.length / 2);
  //     const brushY = Math.floor(brush[brushX].length / 2);
  //     const coords = getCoords(brush, [brushX, brushY]);

  //     return coords.map((pair) => [x + pair[0], y + pair[1]]);
  //   }
  // }

  // function handleMouseMove(e) {
  //   if (!mouseCoords) {
  //     setMouseCoords([e.pageX, e.pageY]);
  //   } else if (
  //     mouseCoords[0] >= e.pageX + gridGap + cellSize ||
  //     e.pageX - (gridGap + cellSize) >= mouseCoords[0] ||
  //     mouseCoords[1] >= e.pageY + gridGap + cellSize ||
  //     e.pageY - (gridGap + cellSize) >= mouseCoords[1]
  //   ) {
  //     setMouseCoords([e.pageX, e.pageY]);
  //     const pairs = getAlivePairs(e.pageX, e.pageY);
  //     setLiveCoords(() => new Set(pairs));
  //   }
  // }

  // function drawHoverCell(ctx, x, y) {}

  function drawCell(ctx, x, y) {
    const coordX = y * cellSize + y;
    const coordY = x * (cellSize + gridGap);
    ctx.fillStyle = grid[x][y] === 1 ? color : '#393e46';
    ctx.fillRect(coordX, coordY, cellSize, cellSize);
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, windowSize.width, windowSize.height);
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        drawCell(ctx, x, y);
        // drawHoverCell(ctx, x, y)
      }
    }
  });

  // useEffect(() => {
  //   const ctx = canvasRef.current.getContext('2d');
  //   drawHover(ctx);
  // }, [liveCoords, drawHover]);

  useEffect(() => {
    const count = grid.flat().filter((num) => num === 1).length;
    setAliveCount(count);
  }, [grid, setAliveCount]);

  useInterval(() => nextGen(), start ? Math.abs(speed) : null);
  return (
    <>
      <canvas
        id="board"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        // onClick={handleClick}
        // onMouseMove={handleMouseMove}
      />
    </>
  );
};

export default Canvas;
