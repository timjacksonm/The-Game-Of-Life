import { useState } from 'react';

const useGameLogic = () => {
  const emptyGrid = Array.from({ length: 200 }, () => Array<number>(200).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [brushPattern, setBrushPattern] = useState<number[][] | null>(null);

  const startGame = () => setIsRunning(true);
  const stopGame = () => setIsRunning(false);
  const clearGrid = () => setGrid(emptyGrid);
  const applyPatternToBrush = (pattern: number[][]) => setBrushPattern(pattern);
  const removePatternFromBrush = () => setBrushPattern(null);

  return {
    isRunning,
    startGame,
    stopGame,
    grid,
    setGrid,
    clearGrid,
    brushPattern,
    applyPatternToBrush,
    removePatternFromBrush,
  };
};

export default useGameLogic;
