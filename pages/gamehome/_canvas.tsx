import {
  MouseEvent as ReactMouseEvent,
  WheelEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CanvasProps } from '@/types';
import {
  drawGrid,
  interpolatePanSpeed,
  mouseToGridCoordinates,
  nextGen,
  setGridToPattern,
  toggleCell,
} from '@/utils/gamehelpers';
import Overlay from './_overlay';
import { GameContext } from './_game';

const Canvas = ({ cellSize, isRunning, setCellSize, rangeRef, speed }: CanvasProps) => {
  const emptyGrid = Array.from({ length: 200 }, () => Array<number>(200).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mouseInsideCanvas, setMouseInsideCanvas] = useState<true | false | null>(null);
  const lastUpdateRef = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastDragPos = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const cellSizeRef = useRef(cellSize);
  const isRunningRef = useRef(isRunning);
  const offsetRef = useRef(offset);
  const posRef = useRef({ x: 0, y: 0 });
  const panSpeedRef = useRef(0.1); // Default: 0.1 at cellSize 5. 0.01 at cellSize 95.
  const { pattern, setPattern, cellColor } = useContext(GameContext);

  // Update refs, helps event handlers always reference the most recent state value without triggering unnecessary re-renders.
  useEffect(() => {
    cellSizeRef.current = cellSize;
    isRunningRef.current = isRunning;
    offsetRef.current = offset;
  }, [cellSize, isRunning, offset]);

  // ************** GAME LOOP ************** //
  const gameLoop = useCallback(
    (timestamp: number) => {
      // Check if the time elapsed is greater than the speed
      if (timestamp - lastUpdateRef.current > Math.abs(speed)) {
        const newGrid = nextGen(grid);
        setGrid(newGrid);

        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        drawGrid({
          grid: newGrid,
          ctx,
          cellSize,
          offset,
          cellColor,
        });
        lastUpdateRef.current = timestamp;
      } else {
        // still draw the grid but do not update nextGen
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        drawGrid({
          grid,
          ctx,
          cellSize,
          offset,
          cellColor,
        });
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    },
    [grid, cellSize, offset, speed, cellColor],
  );

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
    // TODO-fix: when window resize the grid dissapears and doesn't draw again until a cell is clicked.

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
      cellColor,
    });
  }, [cellSize, grid, offset, cellColor]);

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
        setGrid((prevGrid) => setGridToPattern(prevGrid, pattern, col, row, grid));
        // temporarily set pattern array to null until I add UI to remove pattern from brush
        setPattern(null);
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

      let newCellSize: number;
      if (delta > 0) {
        // Scrolling down
        newCellSize = Math.max(cellSize - step, min);
        setCellSize(newCellSize);
      } else {
        // Scrolling up
        newCellSize = Math.min(cellSize + step, max);
        setCellSize(newCellSize);
      }

      if (!panSpeedRef.current) return;
      // Update panSpeed based on the new cellSize
      const newPanSpeed = interpolatePanSpeed(newCellSize);
      panSpeedRef.current = newPanSpeed;
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
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
      // on mount, mouseInsideCanvas is null, so we are updating state initially before the mouseenter and mouseleave listeners take over.
      if (mouseInsideCanvas === null) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mouseIsInside =
          rect.top <= mousePositionRef.current.y &&
          mousePositionRef.current.y <= rect.bottom &&
          rect.left <= mousePositionRef.current.x &&
          mousePositionRef.current.x <= rect.right;
        setMouseInsideCanvas(mouseIsInside);
      }
      if (!isDraggingRef.current) return;

      if (lastDragPos.current && panSpeedRef.current) {
        const dx = (event.clientX - lastDragPos.current.x) * panSpeedRef.current;
        const dy = (event.clientY - lastDragPos.current.y) * panSpeedRef.current;

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
          width={window.innerWidth * 0.985}
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
          mouseInsideCanvas={mouseInsideCanvas}
          isDraggingRef={isDraggingRef}
        />
      )}
    </div>
  );
};

export default Canvas;
