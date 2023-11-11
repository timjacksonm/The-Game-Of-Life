// import { fetchWikiPatternById } from '@/utils/api';
// import { decode } from '@/utils/decdoe';
import { Dispatch, SetStateAction } from 'react';
import Controls from '@/components/controls';
import { FiSettings } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';

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
  return (
    <>
      <div className='mx-auto flex justify-around py-4'>
        <button className='mr-6 flex flex-col items-center justify-center' onClick={toggleGuide}>
          <FaBook color={guideOpen ? '#3b82f6' : '#fff'} size='2em' />
          <p className='pt-1'>Guide</p>
        </button>
        <Controls resetGenerationCount={resetGenerationCount} />
        <button className='ml-6 flex flex-col items-center justify-center' onClick={toggleOptions}>
          <FiSettings color={optionsOpen ? '#3b82f6' : '#fff'} size='2em' />
          <p className='pt-1'>Options</p>
        </button>
      </div>
    </>
  );
}
