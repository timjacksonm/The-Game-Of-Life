import React, { useState } from 'react';
import Grid from './components/grid/grid';
import Header from './components/header/header';
import Options from './components/options/options';

const App = () => {
  const [gridValue, setGridValue] = useState(4);
  const start = false;

  return (
    <div>
      <Header />
      <Options gridValue={gridValue} setGridValue={setGridValue} />
      <Grid start={start} rows={gridValue} columns={gridValue} />
    </div>
  );
};

export default App;
