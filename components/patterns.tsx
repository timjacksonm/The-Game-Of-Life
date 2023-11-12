import { useContext, useState } from 'react';
import Combobox from './combobox';
import PatternDetails from './patterndetails';
import { GiPalette } from 'react-icons/gi';
import { GameContext } from '@/pages/gamehome/_game';
import Button from './button';

const Patterns = () => {
  const { applyPatternToBrush, removePatternFromBrush, brushPattern } = useContext(GameContext);
  const [selectedPatternId, setSelectedPatternId] = useState('');
  const [decodedPattern, setDecodedPattern] = useState<number[][] | null>(null);

  const setPatternToView = (patternId: string) => void setSelectedPatternId(patternId);

  const handleClickApply = () => {
    if (decodedPattern && decodedPattern.length) {
      applyPatternToBrush(decodedPattern);
    }
  };

  const handleClickRemove = () => {
    removePatternFromBrush();
  };

  const clearSelectedPattern = () => {
    setSelectedPatternId('');
    setDecodedPattern(null);
  };

  return (
    <div className='flex h-full flex-col justify-between'>
      <div className='flex h-2/5 flex-col items-center p-2'>
        <div className='h-full w-full overflow-y-auto bg-gray-600'>
          <div className='flex h-full flex-col'>
            <div className='flex h-1/5 border-2 border-gray-400'>
              <Button
                clickHanlder={handleClickRemove}
                name='Remove Pattern'
                disabled={!(brushPattern && brushPattern.length)}
              >
                <GiPalette title='Palette' size='2em' />
              </Button>
              <Button
                clickHanlder={handleClickApply}
                name='Apply Pattern'
                disabled={!(decodedPattern && decodedPattern.length)}
              >
                <GiPalette title='Palette' size='2em' />
              </Button>
            </div>
            <h1 className='p-2 text-center font-bold underline'>Pattern Details</h1>
            {selectedPatternId ? (
              <PatternDetails
                selectedPatternId={selectedPatternId}
                setDecodedPattern={setDecodedPattern}
              />
            ) : (
              <div>No pattern selected</div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-end p-2'>
        <Combobox setPatternToView={setPatternToView} clearSelectedPattern={clearSelectedPattern} />
      </div>
    </div>
  );
};

export default Patterns;
