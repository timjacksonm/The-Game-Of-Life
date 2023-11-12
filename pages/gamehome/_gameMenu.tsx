import { Dispatch, SetStateAction, useContext } from 'react';
import Controls from '@/components/controls';
import { FiSettings } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { GameContext } from './_game';

interface GameControlsProps {
  resetGenerationCount: () => void;
  guideOpen: boolean;
  optionsOpen: boolean;
  toggleGuide: () => void;
  toggleOptions: () => void;
  setOverlayCellColor: Dispatch<SetStateAction<string>>;
  setCellColor: Dispatch<SetStateAction<string>>;
  setSpeed: Dispatch<SetStateAction<number>>;
}

export default function GameMenu({
  resetGenerationCount,
  toggleGuide,
  toggleOptions,
  guideOpen,
  optionsOpen,
}: GameControlsProps) {
  const { isRunning } = useContext(GameContext);
  return (
    <>
      <div className='mx-auto flex justify-around py-4'>
        <button
          className='mr-6 flex flex-col items-center justify-center'
          onClick={toggleGuide}
          disabled={isRunning}
        >
          <FaBook color={guideOpen ? '#3b82f6' : '#fff'} size='2em' />
          <p className='pt-1'>Guide</p>
        </button>
        <Controls resetGenerationCount={resetGenerationCount} />
        <button
          className='ml-6 flex flex-col items-center justify-center'
          onClick={toggleOptions}
          disabled={isRunning}
        >
          <FiSettings color={optionsOpen ? '#3b82f6' : '#fff'} size='2em' />
          <p className='pt-1'>Options</p>
        </button>
      </div>
    </>
  );
}
