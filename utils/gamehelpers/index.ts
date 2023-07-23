import { DrawGridProps } from '@/types';
import { produce } from 'immer';

export function drawGrid({
  grid,
  ctx,
  cellSize,
  canvasWidth,
  canvasHeight,
  offset,
}: DrawGridProps) {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const gridGap = 1;
  const offsetX = (canvasWidth - grid[0].length * (cellSize + gridGap)) / 2;
  const offsetY = (canvasHeight - grid.length * (cellSize + gridGap)) / 2;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const coordX =
        offsetX + ((y - offset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);
      const coordY = offsetY + ((x - offset.y + grid.length) % grid.length) * (cellSize + gridGap);
      ctx.fillStyle = grid[x][y] ? '#32CD32' : '#393e46';
      ctx.fillRect(coordX, coordY, cellSize, cellSize);
    }
  }
}

export function nextGen(setGrid: React.Dispatch<React.SetStateAction<number[][]>>) {
  setGrid((grid) =>
    produce(grid, (gridCopy) => {
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          const cell = grid[x][y];
          const neighbors = countNeighbors(grid, x, y);
          // rules
          if (cell === 1 && neighbors < 2) {
            gridCopy[x][y] = 0;
          } else if (cell === 1 && neighbors > 3) {
            gridCopy[x][y] = 0;
          } else if (cell === 0 && neighbors === 3) {
            gridCopy[x][y] = 1;
          }
        }
      }
    }),
  );
}

export function countNeighbors(grid: number[][], indexX: number, indexY: number) {
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

      if (column >= 0 && row >= 0 && column < grid.length && row < grid[0].length) {
        const currentNeighbour = grid[column][row];
        num += currentNeighbour;
      }
    }
  }
  return num;
}
