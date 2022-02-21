import React, { useState } from 'react';
import Canvas from './components/canvas/canvas';
import useWindowSize from './hooks/useWindowSize';
import Menu from './components/menu/menu';
import Button from './components/button/button';
import Counter from './components/counter/counter';
import Sidenav from './components/sidenav/sidenav';
import defaultGrid from './utils';
import { FiPlay, FiPause, FiSettings } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';

const App = () => {
  const windowSize = useWindowSize();
  const cellSize = 16;
  const gridGap = 1;
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(-50);
  const [color, setColor] = useState('#61dafb');
  const [genCount, setGenCount] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [grid, setGrid] = useState(defaultGrid(windowSize, gridGap, cellSize));
  const [navOpen, setNavOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [brush, setBrush] = useState();
  const [liveCoords, setLiveCoords] = useState(() => new Set());

  return (
    <>
      <Menu>
        <Counter title="Generation" state={genCount} />
        <Counter title="Alive" state={aliveCount} />
        <Button
          name="Guide"
          color=""
          clickHanlder={() => {
            setStart(false);
            setNavOpen(false);
            setGuideOpen(!guideOpen);
          }}
        >
          <FaBook color={guideOpen ? color : '#fff'} size="2em" title="Guide" />
        </Button>
        <Button
          name={start ? 'Pause' : 'Start'}
          color=""
          clickHanlder={() => {
            setNavOpen(false);
            setGuideOpen(false);
            setStart(!start);
          }}
        >
          {start ? (
            <FiPause color={color} title="Pause" size="2em" />
          ) : (
            <FiPlay title="Play" size="2em" />
          )}
        </Button>
        <Button
          name="Settings"
          color=""
          clickHanlder={() => {
            setStart(false);
            setGuideOpen(false);
            setNavOpen(!navOpen);
          }}
        >
          <FiSettings
            color={navOpen ? color : '#fff'}
            title="Brushes"
            size="2em"
          />
        </Button>
      </Menu>

      <Sidenav name="Guide" isOpen={guideOpen} color={color} />
      <Sidenav
        name="Settings"
        isOpen={navOpen}
        grid={grid}
        setGrid={setGrid}
        gridGap={gridGap}
        cellSize={cellSize}
        windowSize={windowSize}
        setGenCount={setGenCount}
        speed={speed}
        setSpeed={setSpeed}
        color={color}
        setColor={setColor}
        setBrush={setBrush}
        setLiveCoords={setLiveCoords}
      />

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
        color={color}
        brush={brush}
        liveCoords={liveCoords}
        setLiveCoords={setLiveCoords}
      />
    </>
  );
};

export default App;
