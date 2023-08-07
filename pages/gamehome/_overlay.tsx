import { mouseToGridCoordinates } from '@/utils/gamehelpers';
import { RefObject, useEffect, useRef } from 'react';

interface OverlayProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  cellSize: number;
  grid: number[][];
  offset: { x: number; y: number };
}

const Overlay = ({ canvasRef, cellSize, grid, offset }: OverlayProps) => {
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

    const handleMouseMove = (event: MouseEvent) => {
      hoverCtx.clearRect(0, 0, currentSize.width, currentSize.height); // Clear the hover canvas
      const coordinates = mouseToGridCoordinates(
        mainCanvas,
        cellSize,
        event,
        { gridXLength: grid[0].length, gridYLength: grid.length },
        offset,
      );

      if (!coordinates) return;
      const { row, col } = coordinates;

      const coordX =
        offsetX + ((col - offset.x + grid[0].length) % grid[0].length) * (cellSize + gridGap);
      const coordY =
        offsetY + ((row - offset.y + grid.length) % grid.length) * (cellSize + gridGap);
      hoverCtx.fillStyle = 'yellow';
      hoverCtx.fillRect(coordX, coordY, cellSize, cellSize);
    };

    mainCanvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      mainCanvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, cellSize, grid, offset]);

  return (
    <canvas
      width={window.innerWidth * 0.6}
      height={window.innerHeight * 0.8}
      ref={hoverCanvasRef}
      className='pointer-events-none absolute'
    />
  );
};

export default Overlay;
