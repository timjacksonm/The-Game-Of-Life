import React, { useState } from 'react';
import Grid from './components/grid/grid';
import Header from './components/header/header';

const App = () => {
  const [gridValue, setGridValue] = useState(4);
  const [start, setStart] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);
  const [speed, setSpeed] = useState(-600);

  return (
    <div>
      <Header
        start={start}
        setStart={setStart}
        gridValue={gridValue}
        setGridValue={setGridValue}
        setWasRunning={setWasRunning}
        speed={speed}
        setSpeed={setSpeed}
      />
      <Grid
        start={start}
        setStart={setStart}
        wasRunning={wasRunning}
        setWasRunning={setWasRunning}
        rows={gridValue}
        columns={gridValue}
        speed={speed}
      />
    </div>
  );
};

export default App;
