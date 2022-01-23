import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';

const App = () => {
  const [cellSize, setCellSize] = useState(15);
  const [gridGap, setGridGap] = useState(1);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(20);

  return (
    <>
      <button style={{ position: 'absolute' }} onClick={() => setStart(!start)}>
        {start ? 'Stop' : 'Start'}
      </button>
      <Canvas
        cellSize={cellSize}
        gridGap={gridGap}
        start={start}
        speed={speed}
      />
    </>
  );
};

export default App;
