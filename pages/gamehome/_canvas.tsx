import { WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import { CanvasProps } from '@/types';
import { drawGrid, nextGen } from '@/utils/gamehelpers';

const Canvas = ({ cellSize, pattern, isRunning, setCellSize, rangeRef }: CanvasProps) => {
  const emptyGrid = Array.from({ length: 200 }, () => Array<number>(200).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [mouseInsideCanvas, setMouseInsideCanvas] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastDragPos = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(isDragging);
  const cellSizeRef = useRef(cellSize);
  const isRunningRef = useRef(isRunning);

  // ************** GAME LOOP ************** //
  const gameLoop = useCallback(() => {
    nextGen(setGrid);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, []);

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
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const currentSize = { width: ctx.canvas.width, height: ctx.canvas.height };
    drawGrid({
      grid,
      ctx,
      cellSize,
      canvasWidth: currentSize.width,
      canvasHeight: currentSize.height,
      offset,
    });
  }, [cellSize, grid, offset]);

  // *************************************** //

  // ************** LOAD PATTERN ************** //
  useEffect(() => {
    // Centers the new pattern in the middle of the grid
    if (pattern) {
      setGrid((prevGrid) =>
        produce(prevGrid, (draft) => {
          const centerX = Math.floor(prevGrid[0].length / 2) - Math.floor(pattern[0].length / 2);
          const centerY = Math.floor(prevGrid.length / 2) - Math.floor(pattern.length / 2);

          for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
              draft[centerY + i][centerX + j] = pattern[i][j];
            }
          }
        }),
      );
    }
  }, [pattern]);
  // ****************************************** //

  // ************** Scroll Events (Zoom) ************** //
  const handleScroll = (event: WheelEvent) => {
    const slider = rangeRef.current;
    if (!slider) return;
    if (!isRunning && mouseInsideCanvas) {
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

  // only allow zooming when mouse is inside canvas
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
      // Clean up event listeners on unmount
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  // *************************************************** //

  // ************** Move Events (Panning) ************** //
  // I wanted event listeners to only be added once and remove when this component umounts
  // so I used useRef to keep track of the values of isDragging and cellSize
  // and used useEffect to update the values when they change
  useEffect(() => {
    isDraggingRef.current = isDragging;
    cellSizeRef.current = cellSize;
    isRunningRef.current = isRunning;
  }, [isDragging, cellSize, isRunning]);

  // This useEffect adds event listeners to the canvas only once and doesn't re render
  // when isDragging or cellSize changes
  // Adding dependencies would cause re render and event listeners to be added / removed every time
  useEffect(() => {
    const handleMouseDown = () => {
      if (isRunning) return;
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      if (isRunning) return;
      setIsDragging(false);
      lastDragPos.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || isRunning) return;
      const panSpeed = 0.1;

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
  }, [isRunning, grid]);
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
        />
      )}
    </div>
  );
};

export default Canvas;
