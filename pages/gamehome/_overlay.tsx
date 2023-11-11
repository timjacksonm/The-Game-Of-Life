import { drawCell, mouseToGridCoordinates } from '@/utils/gamehelpers';
import { throttle } from 'lodash';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameContext } from './_game';

interface OverlayProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  grid: number[][];
  panningOffset: { x: number; y: number };
  mouseInsideCanvas: boolean | null;
  isDraggingRef: RefObject<boolean>;
}

const Overlay = ({
  canvasRef,
  grid,
  panningOffset,
  mouseInsideCanvas,
  isDraggingRef,
}: OverlayProps) => {
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const { cellSize, brushPattern, overlayCellColor } = useContext(GameContext);

  const drawPatternOnOverlayCanvas = (
    hoverCtx: CanvasRenderingContext2D,
    row: number,
    col: number,
    brushPattern: number[][],
    centeringOffset: { x: number; y: number },
    panningOffset: { x: number; y: number },
    grid: number[][],
    cellSize: number,
    gridGap: number,
    overlayCellColor: string,
  ) => {
    if (isDraggingRef.current) return;
    const patternCenterRow = Math.floor(brushPattern.length / 2);
    const patternCenterCol = Math.floor(brushPattern[patternCenterRow].length / 2);

    for (let patternRow = 0; patternRow < brushPattern.length; patternRow++) {
      for (let patternCol = 0; patternCol < brushPattern[patternRow].length; patternCol++) {
        if (brushPattern[patternRow][patternCol] === 1) {
          // Calculate the X-coordinate where the cell in the pattern should be drawn on the overlay canvas.
          // The 'centeringOffset.x' accounts for the grid's horizontal centering in the canvas.
          // The '(col + patternCol - patternCenterCol - panningOffset.x + grid[0].length) % grid[0].length'
          // calculates the wrapped column index after considering pattern centering and panning adjustments.
          // This creates a toroidal (wrap-around) effect for the pattern within the grid.
          // The '(cellSize + gridGap)' adjusts for the cell size and gap between cells.
          const coordX =
            centeringOffset.x +
            ((col + patternCol - patternCenterCol - panningOffset.x + grid[0].length) %
              grid[0].length) *
              (cellSize + gridGap);
          // Calculate the Y-coordinate where the cell in the pattern should be drawn on the overlay canvas.
          // The 'centeringOffset.y' accounts for the grid's vertical centering in the canvas.
          // The '(row + patternRow - patternCenterRow - panningOffset.y + grid.length) % grid.length'
          // calculates the wrapped row index after considering pattern centering and panning adjustments.
          // This creates a toroidal (wrap-around) effect for the pattern within the grid.
          // The '(cellSize + gridGap)' adjusts for the cell size and gap between cells.
          const coordY =
            centeringOffset.y +
            ((row + patternRow - patternCenterRow - panningOffset.y + grid.length) % grid.length) *
              (cellSize + gridGap);

          drawCell(hoverCtx, coordX, coordY, cellSize, overlayCellColor);
        }
      }
    }
  };

  useEffect(() => {
    const mainCanvas = canvasRef.current;
    const hoverCanvas = hoverCanvasRef.current;
    if (!mainCanvas || !hoverCanvas) return;

    const hoverCtx = hoverCanvas.getContext('2d');
    if (!hoverCtx) return;

    const gridGap = 1;
    const canvasWidth = hoverCanvas.width;
    const canvasHeight = hoverCanvas.height;
    const centeringOffset = {
      x: (canvasWidth - grid[0].length * (cellSize + gridGap)) / 2,
      y: (canvasHeight - grid.length * (cellSize + gridGap)) / 2,
    };

    // throttle prevents this from triggering more than it needs too.
    // With this unset and a large pattern it would cause performance problems.
    const handleMouseMove = throttle((event: MouseEvent) => {
      hoverCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!mouseInsideCanvas) return;

      const coordinates = mouseToGridCoordinates(
        mainCanvas,
        cellSize,
        event,
        { gridXLength: grid[0].length, gridYLength: grid.length },
        panningOffset,
      );

      if (!coordinates) return;
      const { row, col } = coordinates;

      if (brushPattern && brushPattern.length) {
        drawPatternOnOverlayCanvas(
          hoverCtx,
          row,
          col,
          brushPattern,
          centeringOffset,
          panningOffset,
          grid,
          cellSize,
          gridGap,
          overlayCellColor,
        );
      } else {
        // Draw a single alive cell on the overlay canvas.

        // Calculate the X-coordinate where the cell should be drawn on the overlay canvas.
        // The 'centeringOffset.x' adjusts for centering the grid in the canvas.
        // The '(col - panningOffset.x + grid[0].length) % grid[0].length' computes
        // the toroidal (wrap-around) effect after considering panning and grid boundaries.
        // The '(cellSize + gridGap)' factors in the cell size and gap between cells.
        const coordX =
          centeringOffset.x +
          ((col - panningOffset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);

        // Calculate the Y-coordinate where the cell should be drawn on the overlay canvas.
        // The 'centeringOffset.y' adjusts for centering the grid in the canvas.
        // The '(row - panningOffset.y + grid.length) % grid.length' computes
        // the toroidal (wrap-around) effect after considering panning and grid boundaries.
        // The '(cellSize + gridGap)' factors in the cell size and gap between cells.
        const coordY =
          centeringOffset.y +
          ((row - panningOffset.y + grid.length) % grid.length) * (cellSize + gridGap);

        drawCell(hoverCtx, coordX, coordY, cellSize, overlayCellColor);
      }
    }, 100);

    mainCanvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      mainCanvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, cellSize, grid, panningOffset, brushPattern, mouseInsideCanvas, overlayCellColor]);

  return (
    <>
      {typeof window !== 'undefined' && (
        <canvas
          width={window.innerWidth * 0.985}
          height={window.innerHeight * 0.8}
          ref={hoverCanvasRef}
          className='pointer-events-none absolute'
        />
      )}
    </>
  );
};

export default Overlay;
