import { DrawGridProps } from '@/types';
import { produce } from 'immer';

export function drawGrid({ grid, ctx, cellSize, offset }: DrawGridProps) {
  if (!ctx) return;
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const gridGap = 1;
  const offsetX = (canvasWidth - grid[0].length * (cellSize + gridGap)) / 2;
  const offsetY = (canvasHeight - grid.length * (cellSize + gridGap)) / 2;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const coordX =
        offsetX + ((col - offset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);
      const coordY =
        offsetY + ((row - offset.y + grid.length) % grid.length) * (cellSize + gridGap);
      ctx.fillStyle = grid[row][col] ? '#32CD32' : '#393e46';
      ctx.fillRect(coordX, coordY, cellSize, cellSize);
    }
  }
}

export function nextGen(grid: number[][]): number[][] {
  return produce(grid, (draftGrid) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
        const neighbors = countNeighbors(grid, row, col);
        // rules
        if (cell === 1 && neighbors < 2) {
          draftGrid[row][col] = 0;
        } else if (cell === 1 && neighbors > 3) {
          draftGrid[row][col] = 0;
        } else if (cell === 0 && neighbors === 3) {
          draftGrid[row][col] = 1;
        }
      }
    }
  });
}

export function countNeighbors(grid: number[][], rowIndex: number, colIndex: number) {
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
      const row = (rowIndex + x + grid.length) % grid.length;
      const col = (colIndex + y + grid[0].length) % grid[0].length;

      if (row < grid.length && col < grid[0].length) {
        const currentNeighbour = grid[row][col];
        num += currentNeighbour;
      }
    }
  }
  return num;
}

/**
 * Helper function to calculate cell coordinates from the mouse position
 * This takes into account the canvas position, grid size, current grid offset and canvas offset
 **/
export const mouseToGridCoordinates = (
  canvasRef: HTMLCanvasElement | null,
  cellSize: number,
  event: React.MouseEvent | MouseEvent,
  gridLength: { gridXLength: number; gridYLength: number },
  offset: { x: number; y: number },
) => {
  if (!canvasRef) return;

  const cellPlusGapSize = cellSize + 1;
  const { clientX, clientY } = event;
  const { gridXLength, gridYLength } = gridLength;

  // Get the position of the canvas relative to the viewport and its dimensions
  const { left: rectLeft, top: rectTop } = canvasRef.getBoundingClientRect();
  const { width: canvasWidth, height: canvasHeight } = canvasRef;

  // Calculate the offset of the drawing area within the canvas to center the grid
  const offsetX = (canvasWidth - gridXLength * cellPlusGapSize) / 2;
  const offsetY = (canvasHeight - gridYLength * cellPlusGapSize) / 2;

  const calcCoordinate = (
    clickPos: number,
    rectPos: number,
    gridSize: number,
    offsetCoord: number,
    canvasOffset: number,
  ) => {
    const pos =
      ((clickPos - rectPos - canvasOffset) / cellPlusGapSize + offsetCoord + gridSize) % gridSize;
    return Math.floor(pos);
  };

  const col = calcCoordinate(clientX, rectLeft, gridXLength, offset.x, offsetX);
  const row = calcCoordinate(clientY, rectTop, gridYLength, offset.y, offsetY);

  return { row, col };
};

export const drawCell = (
  ctx: CanvasRenderingContext2D,
  coordX: number,
  coordY: number,
  cellSize: number,
  color: string,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(coordX, coordY, cellSize, cellSize);
};

export const setGridToPattern = (
  grid: number[][],
  pattern: number[][],
  col: number,
  row: number,
) => {
  const colOffset = Math.floor(pattern[0].length / 2);
  const rowOffset = Math.floor(pattern.length / 2);

  return produce(grid, (draftGrid) => {
    for (let patternRow = 0; patternRow < pattern.length; patternRow++) {
      for (let patternCol = 0; patternCol < pattern[patternRow].length; patternCol++) {
        const newCol = col - colOffset + patternCol;
        const newRow = row - rowOffset + patternRow;

        if (
          newCol >= 0 &&
          newRow >= 0 &&
          newCol < draftGrid[0].length &&
          newRow < draftGrid.length &&
          pattern[patternRow][patternCol] === 1
        ) {
          draftGrid[newRow][newCol] = 1;
        }
      }
    }
  });
};

export const toggleCell = (grid: number[][], col: number, row: number) =>
  produce(grid, (draftGrid) => {
    draftGrid[row][col] = draftGrid[row][col] ? 0 : 1;
  });
