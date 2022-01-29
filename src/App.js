import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';
import useWindowSize from './hooks/useWindowSize';
import Menu from './components/menu/menu';
import Button from './components/button/button';

const App = () => {
  const windowSize = useWindowSize();
  const [cellSize, setCellSize] = useState(16);
  const [gridGap, setGridGap] = useState(1);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(50);

  return (
    <>
      <Menu>
        <Button clickHanlder={() => setStart(!start)}>
          {start ? 'Stop' : 'Start'}
        </Button>
      </Menu>

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
