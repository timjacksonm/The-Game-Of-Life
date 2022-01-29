import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';
import useWindowSize from './hooks/useWindowSize';
import Menu from './components/menu/menu';
import Button from './components/button/button';
import { FiPlay, FiPause } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { GiPalette } from 'react-icons/gi';

const App = () => {
  const windowSize = useWindowSize();
  const [cellSize, setCellSize] = useState(16);
  const [gridGap, setGridGap] = useState(1);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(50);

  return (
    <>
      <Menu>
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
        <Button name="Templates" color="" clickHanlder={() => ''}>
          <GiPalette title="Templates" size="2em" />
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
