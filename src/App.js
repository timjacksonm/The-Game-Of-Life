import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';
import useWindowSize from './hooks/useWindowSize';

import { useGetPatternNamesQuery } from './services/gameoflifeapi';

const App = () => {
  const windowSize = useWindowSize();
  const [cellSize, setCellSize] = useState(16);
  const [gridGap, setGridGap] = useState(1);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(50);

  // const { data, isFetching } = useGetPatternNamesQuery();

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
        windowSize={windowSize}
      />
    </>
  );
};

export default App;
