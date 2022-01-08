import React, { useState, useEffect } from 'react';
import Grid from './components/grid/grid';
import Header from './components/header/header';
import Options from './components/options/options';

const App = () => {
  const [gridValue, setGridValue] = useState(4);
  const [start, setStart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);

  return (
    <div>
      <Header showOptions={showOptions} setShowOptions={setShowOptions} />
      <Options
        showOptions={showOptions}
        start={start}
        setStart={setStart}
        gridValue={gridValue}
        setGridValue={setGridValue}
        setWasRunning={setWasRunning}
      />
      <Grid
        start={start}
        setStart={setStart}
        wasRunning={wasRunning}
        setWasRunning={setWasRunning}
        rows={gridValue}
        columns={gridValue}
      />
    </div>
  );
};

export default App;
