import { Dispatch, SetStateAction, useContext } from 'react';
import Controls from '@/components/controls';
import { FiSettings } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { GameContext } from './_game';

interface GameControlsProps {
  resetGenerationCount: () => void;
  guideOpen: boolean;
  optionsOpen: boolean;
  toggleMenu: (name: string) => void;
  setOverlayCellColor: Dispatch<SetStateAction<string>>;
  setCellColor: Dispatch<SetStateAction<string>>;
  setSpeed: Dispatch<SetStateAction<number>>;
}

export default function GameMenu({
  resetGenerationCount,
  toggleMenu,
  guideOpen,
  optionsOpen,
}: GameControlsProps) {
  const { isRunning, stopGame } = useContext(GameContext);

  const handleClick = (action: (name: string) => void, name: string) => {
    if (isRunning) stopGame();
    action(name);
  };

  return (
    <div className='mx-auto flex justify-around py-4'>
      <button
        className='mr-6 flex flex-col items-center justify-center'
        onClick={() => handleClick(toggleMenu, 'guide')}
      >
        <FaBook color={guideOpen ? '#3b82f6' : '#fff'} size='2em' />
        <p className='pt-1'>Guide</p>
      </button>
      <Controls resetGenerationCount={resetGenerationCount} />
      <button
        className='ml-6 flex flex-col items-center justify-center'
        onClick={() => handleClick(toggleMenu, 'options')}
      >
        <FiSettings color={optionsOpen ? '#3b82f6' : '#fff'} size='2em' />
        <p className='pt-1'>Options</p>
      </button>
    </div>
  );
}
