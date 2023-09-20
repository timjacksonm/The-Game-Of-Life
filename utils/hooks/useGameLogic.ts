import { useState } from 'react';

const useGameLogic = () => {
  const emptyGrid = Array.from({ length: 200 }, () => Array<number>(200).fill(0));
  const [grid, setGrid] = useState(emptyGrid);
  const [isRunning, setIsRunning] = useState(false);

  const startGame = () => setIsRunning(true);
  const stopGame = () => setIsRunning(false);
  const clearGrid = () => setGrid(emptyGrid);

  return {
    isRunning,
    startGame,
    stopGame,
    grid,
    setGrid,
    clearGrid,
  };
};

export default useGameLogic;
