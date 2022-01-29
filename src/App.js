import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';
import useWindowSize from './hooks/useWindowSize';
import Menu from './components/menu/menu';
import Button from './components/button/button';
import Counter from './components/counter/counter';
import defaultGrid from './utils';
import { FiPlay, FiPause } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { GiPalette } from 'react-icons/gi';

const App = () => {
  const windowSize = useWindowSize();
  const [cellSize, setCellSize] = useState(16);
  const [gridGap, setGridGap] = useState(1);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [genCount, setGenCount] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [grid, setGrid] = useState(defaultGrid(windowSize, gridGap, cellSize));

  return (
    <>
      <Menu>
        <Counter title="Generation" state={genCount} />
        <Counter title="Alive" state={aliveCount} />
        <Button name="Rules" color="" clickHanlder={() => ''}>
          <FaBook size="2em" title="Rules" />
        </Button>
        <Button
          name={start ? 'Start' : 'Pause'}
          color=""
          clickHanlder={() => setStart(!start)}
        >
          {start ? (
            <FiPause fill="green" title="Pause" size="2em" />
          ) : (
            <FiPlay title="Play" size="2em" />
          )}
        </Button>
        <Button name="Brushes" color="" clickHanlder={() => ''}>
          <GiPalette title="Brushes" size="2em" />
        </Button>
      </Menu>

      <Canvas
        grid={grid}
        setGrid={setGrid}
        setGenCount={setGenCount}
        setAliveCount={setAliveCount}
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
