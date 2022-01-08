import React, { useState } from 'react';
import Grid from './components/grid/grid';
import Header from './components/header/header';

const App = () => {
  const [gridValue, setGridValue] = useState(4);
  const [start, setStart] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);

  return (
    <div>
      <Header
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
