import { drawCell, mouseToGridCoordinates } from '@/utils/gamehelpers';
import { throttle } from 'lodash';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { GameContext } from './_game';

interface OverlayProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  cellSize: number;
  grid: number[][];
  panningOffset: { x: number; y: number };
  mouseInsideCanvas: boolean | null;
  isDraggingRef: RefObject<boolean>;
}

const Overlay = ({
  canvasRef,
  cellSize,
  grid,
  panningOffset,
  mouseInsideCanvas,
  isDraggingRef,
}: OverlayProps) => {
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const { overlayCellColor, pattern } = useContext(GameContext);

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

      if (pattern && pattern.length) {
        drawPatternOnOverlayCanvas(
          hoverCtx,
          row,
          col,
          pattern,
          centeringOffset,
          panningOffset,
          grid,
          cellSize,
          gridGap,
          overlayCellColor,
        );
      } else {
        // draw single alive cell on overlay canvas
        const coordX =
          centeringOffset.x +
          ((col - panningOffset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);
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
  }, [canvasRef, cellSize, grid, panningOffset, pattern, mouseInsideCanvas, overlayCellColor]);

  const drawPatternOnOverlayCanvas = (
    hoverCtx: CanvasRenderingContext2D,
    row: number,
    col: number,
    pattern: number[][],
    centeringOffset: { x: number; y: number },
    panningOffset: { x: number; y: number },
    grid: number[][],
    cellSize: number,
    gridGap: number,
    overlayCellColor: string,
  ) => {
    if (isDraggingRef.current) return;
    const patternCenterRow = Math.floor(pattern.length / 2);
    const patternCenterCol = Math.floor(pattern[patternCenterRow].length / 2);

    for (let patternRow = 0; patternRow < pattern.length; patternRow++) {
      for (let patternCol = 0; patternCol < pattern[patternRow].length; patternCol++) {
        if (pattern[patternRow][patternCol] === 1) {
          const coordX =
            centeringOffset.x +
            ((col + patternCol - patternCenterCol - panningOffset.x + grid[0].length) %
              grid[0].length) *
              (cellSize + gridGap);

          const coordY =
            centeringOffset.y +
            ((row + patternRow - patternCenterRow - panningOffset.y + grid.length) % grid.length) *
              (cellSize + gridGap);

          drawCell(hoverCtx, coordX, coordY, cellSize, overlayCellColor);
        }
      }
    }
  };

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
