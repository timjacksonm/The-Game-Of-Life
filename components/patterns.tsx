import { useState } from 'react';
import Combobox from './combobox';

const Patterns = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('');

  const setPatternToView = (patternId: string) => void setSelectedPatternId(patternId);

  return (
    <div className='p-2'>
      <h1>{`Selected Pattern: ${selectedPatternId}`}</h1>
      <Combobox setPatternToView={setPatternToView} />
    </div>
  );
};

export default Patterns;
