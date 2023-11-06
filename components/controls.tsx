import { GameContext } from '@/pages/gamehome/_game';
import { GameActions } from '@/types';
import { useContext } from 'react';
import { FiPlay, FiPause, FiSettings } from 'react-icons/fi';

interface ControlsProps {
  gameActions: GameActions;
  resetGenerationCount: () => void;
}

export default function Controls({ gameActions, resetGenerationCount }: ControlsProps) {
  const { isRunning, generationCount, aliveCount } = useContext(GameContext);
  const { startGame, stopGame, clearGrid } = gameActions;

  const handleReset = () => {
    clearGrid();
    resetGenerationCount();
  };
  return (
    <div>
      <button
        className={`m-2 w-min whitespace-nowrap px-4 py-2 ${
          isRunning ? 'bg-gray-400' : 'bg-blue-500'
        }`}
        onClick={startGame}
        disabled={isRunning}
      >
        Start
      </button>
      <button
        onClick={stopGame}
        className={`m-2 w-min whitespace-nowrap px-4 py-2 ${
          !isRunning ? 'bg-gray-400' : 'bg-blue-500'
        }`}
        disabled={!isRunning}
      >
        Stop
      </button>
      <button
        onClick={handleReset}
        className={`m-2 w-min whitespace-nowrap px-4 py-2 ${
          aliveCount !== 0 && !isRunning ? 'bg-blue-500' : 'bg-gray-400'
        }`}
        disabled={aliveCount === 0 || isRunning}
      >
        Reset
      </button>
      <div className='flex justify-around'>
        <p>{`Generation: ${generationCount}`}</p>
        <p>{`Alive: ${aliveCount}`}</p>
      </div>
    </div>
  );
}
