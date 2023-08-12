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
  fullGrid: number[][],
): number[][] =>
  produce(grid, (draft) => {
    const patternCenterRow = Math.floor(pattern.length / 2);
    const patternCenterCol = Math.floor(pattern[patternCenterRow].length / 2);

    for (let patternRow = 0; patternRow < pattern.length; patternRow++) {
      for (let patternCol = 0; patternCol < pattern[patternRow].length; patternCol++) {
        if (pattern[patternRow][patternCol] === 1) {
          const gridRow = (row + patternRow - patternCenterRow + fullGrid.length) % fullGrid.length;
          const gridCol =
            (col + patternCol - patternCenterCol + fullGrid[0].length) % fullGrid[0].length;
          draft[gridRow][gridCol] = 1;
        }
      }
    }
  });

export const toggleCell = (grid: number[][], col: number, row: number) =>
  produce(grid, (draftGrid) => {
    draftGrid[row][col] = draftGrid[row][col] ? 0 : 1;
  });

export const interpolatePanSpeed = (currentCellSize: number): number => {
  // Define known points for both interpolation segments.
  const x1 = 5,
    y1 = 0.1;
  const xMid = 15,
    yMid = 0.025; // Pre-halved
  const x2 = 95,
    y2 = 0.01; // Pre-halved

  // This function returns the cubic interpolation between two points.
  const cubicInterpolation = (t: number, yStart: number, yEnd: number): number => {
    const factor = t * t * t;
    return yStart * (1 - factor) + yEnd * factor;
  };

  // This function returns the quintic interpolation between two points.
  const quinticInterpolation = (t: number, yStart: number, yEnd: number): number => {
    const factor = t * t * t * t * t;
    return yStart * (1 - factor) + yEnd * factor;
  };

  if (currentCellSize <= xMid) {
    return cubicInterpolation((currentCellSize - x1) / (xMid - x1), y1, yMid);
  } else {
    return quinticInterpolation((currentCellSize - xMid) / (x2 - xMid), yMid, y2);
  }
};
