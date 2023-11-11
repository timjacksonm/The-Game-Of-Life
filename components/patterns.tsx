import { useState } from 'react';
import Combobox from './combobox';
import PatternDetails from './patterndetails';

const Patterns = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('');

  const setPatternToView = (patternId: string) => void setSelectedPatternId(patternId);

  return (
    <div className='h-full flex-col justify-between p-2'>
      <h1>{`Selected Pattern: ${selectedPatternId}`}</h1>
      <div className='flex h-2/5 flex-col items-center p-3'>
        <h1 className='font-bold'>Details</h1>
        <div className='h-full w-full overflow-y-auto bg-gray-600'>
          <div className='flex h-full flex-col'>
            {selectedPatternId ? (
              <PatternDetails selectedPatternId={selectedPatternId} />
            ) : (
              <div>No pattern selected</div>
            )}
          </div>
        </div>
      </div>
      <Combobox setPatternToView={setPatternToView} />
    </div>
  );
};

export default Patterns;
