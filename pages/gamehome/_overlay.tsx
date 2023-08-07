import { mouseToGridCoordinates } from '@/utils/gamehelpers';
import { throttle } from 'lodash';
import { RefObject, useEffect, useRef } from 'react';

interface OverlayProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  cellSize: number;
  grid: number[][];
  offset: { x: number; y: number };
  pattern: number[][] | null;
  mouseInsideCanvas: boolean;
}

const Overlay = ({
  canvasRef,
  cellSize,
  grid,
  offset,
  pattern,
  mouseInsideCanvas,
}: OverlayProps) => {
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mainCanvas = canvasRef.current;
    const hoverCanvas = hoverCanvasRef.current;
    if (!mainCanvas || !hoverCanvas) return;

    const hoverCtx = hoverCanvas.getContext('2d');
    if (!hoverCtx) return;

    const gridGap = 1;
    const currentSize = { width: hoverCanvas.width, height: hoverCanvas.height };
    const offsetX = (currentSize.width - grid[0].length * (cellSize + gridGap)) / 2;
    const offsetY = (currentSize.height - grid.length * (cellSize + gridGap)) / 2;

    const handleMouseMove = throttle((event: MouseEvent) => {
      hoverCtx.clearRect(0, 0, currentSize.width, currentSize.height);

      if (!mouseInsideCanvas) return;

      const coordinates = mouseToGridCoordinates(
        mainCanvas,
        cellSize,
        event,
        { gridXLength: grid[0].length, gridYLength: grid.length },
        offset,
      );

      if (!coordinates) return;
      const { row, col } = coordinates;

      if (pattern && pattern.length) {
        const patternX = Math.floor(pattern.length / 2);
        const patternY = Math.floor(pattern[patternX].length / 2);
        for (let i = 0; i < pattern.length; i++) {
          for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] === 1) {
              const wrappedX = (col + j - patternY + grid[0].length) % grid[0].length;
              const wrappedY = (row + i - patternX + grid.length) % grid.length;

              const coordX = offsetX + wrappedX * (cellSize + gridGap);
              const coordY = offsetY + wrappedY * (cellSize + gridGap);
              hoverCtx.fillStyle = 'yellow';
              hoverCtx.fillRect(coordX, coordY, cellSize, cellSize);
            }
          }
        }
      } else {
        // single dot
        const coordX =
          offsetX + ((col - offset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);
        const coordY =
          offsetY + ((row - offset.y + grid.length) % grid.length) * (cellSize + gridGap);
        hoverCtx.fillStyle = 'yellow';
        hoverCtx.fillRect(coordX, coordY, cellSize, cellSize);
      }
    }, 100);

    mainCanvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      mainCanvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, cellSize, grid, offset, pattern, mouseInsideCanvas]);

  return (
    <>
      {typeof window !== 'undefined' && (
        <canvas
          width={window.innerWidth * 0.6}
          height={window.innerHeight * 0.8}
          ref={hoverCanvasRef}
          className='pointer-events-none absolute'
        />
      )}
    </>
  );
};

export default Overlay;
