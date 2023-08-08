import {
  MouseEvent as ReactMouseEvent,
  WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CanvasProps } from '@/types';
import {
  drawGrid,
  mouseToGridCoordinates,
  nextGen,
  setGridToPattern,
  toggleCell,
} from '@/utils/gamehelpers';
import Overlay from './_overlay';

const Canvas = ({ cellSize, pattern, isRunning, setCellSize, rangeRef }: CanvasProps) => {
  const emptyGrid = Array.from({ length: 200 }, () => Array<number>(200).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mouseInsideCanvas, setMouseInsideCanvas] = useState(false);
  const panSpeed = 0.1;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastDragPos = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const cellSizeRef = useRef(cellSize);
  const isRunningRef = useRef(isRunning);
  const offsetRef = useRef(offset);
  const posRef = useRef({ x: 0, y: 0 });

  // Update refs, helps event handlers always reference the most recent state value without triggering unnecessary re-renders.
  useEffect(() => {
    cellSizeRef.current = cellSize;
    isRunningRef.current = isRunning;
    offsetRef.current = offset;
  }, [cellSize, isRunning, offset]);

  // ************** GAME LOOP ************** //
  const gameLoop = useCallback(() => {
    const newGrid = nextGen(grid);
    setGrid(newGrid);

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    drawGrid({
      grid: newGrid,
      ctx,
      cellSize,
      offset,
    });
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [grid, cellSize, offset]);

  useEffect(() => {
    if (isRunning) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if (typeof gameLoopRef.current === 'number') cancelAnimationFrame(gameLoopRef.current);
      };
    }
  }, [isRunning, gameLoop]);

  // *************************************** //

  // ************** DRAW GRID ************** //
  useEffect(() => {
    // Only updates if:
    // cellSize (Zoom) changes
    // Grid is updated due to pattern loaded
    // Offset is changed due to panning the grid

    // if game is running draw grid is handled by game loop. This draw is only for when game is paused.
    if (isRunning) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    drawGrid({
      grid,
      ctx,
      cellSize,
      offset,
    });
  }, [cellSize, grid, offset]);

  // *************************************** //

  // ************** Mouse Events (Click) ************** //
  function handleClick(event: ReactMouseEvent) {
    if (isRunningRef.current || !canvasRef.current) return;

    if (posRef.current.x === event.clientX && posRef.current.y === event.clientY) {
      const coordinates = mouseToGridCoordinates(
        canvasRef.current,
        cellSizeRef.current,
        event,
        { gridXLength: grid[0].length, gridYLength: grid.length },
        offset,
      );

      if (!coordinates) return;
      const { row, col } = coordinates;

      if (pattern) {
        setGrid((prevGrid) => setGridToPattern(prevGrid, pattern, col, row));
      } else {
        setGrid((prevGrid) => toggleCell(prevGrid, col, row));
      }
    }
  }

  // *************************************************** //

  // ************** Mouse Events (Zoom) ************** //
  const handleScroll = (event: WheelEvent) => {
    const slider = rangeRef.current;
    if (!slider) return;
    if (mouseInsideCanvas) {
      const delta = event.deltaY;
      const step = parseFloat(slider.step) || 1;
      const max = parseFloat(slider.max) || 95;
      const min = parseFloat(slider.min) || 2.5;

      if (delta > 0) {
        // Scrolling down
        setCellSize((prevSize) => Math.max(prevSize - step, min));
      } else {
        // Scrolling up
        setCellSize((prevSize) => Math.min(prevSize + step, max));
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseEnter = () => {
      setMouseInsideCanvas(true);
    };

    const handleMouseLeave = () => {
      setMouseInsideCanvas(false);
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  // *************************************************** //

  // ************** Move Events (Panning) ************** //
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      posRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      lastDragPos.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      if (lastDragPos.current) {
        const dx = (event.clientX - lastDragPos.current.x) * panSpeed;
        const dy = (event.clientY - lastDragPos.current.y) * panSpeed;

        setOffset((prevOffset) => ({
          x: (prevOffset.x - dx) % grid[0].length,
          y: (prevOffset.y - dy) % grid.length,
        }));
      }

      lastDragPos.current = { x: event.clientX, y: event.clientY };
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // *************************************************** //

  return (
    <div className='flex flex-1 items-center justify-center'>
      {typeof window !== 'undefined' && (
        <canvas
          width={window.innerWidth * 0.6}
          height={window.innerHeight * 0.8}
          ref={canvasRef}
          className='border border-gray-500'
          onWheel={handleScroll}
          onClick={handleClick}
        />
      )}
      {!isRunning && (
        <Overlay
          canvasRef={canvasRef}
          cellSize={cellSize}
          grid={grid}
          panningOffset={offset}
          pattern={pattern}
          mouseInsideCanvas={mouseInsideCanvas}
        />
      )}
    </div>
  );
};

export default Canvas;
