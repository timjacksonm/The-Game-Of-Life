import { useState, createContext, useRef } from 'react';
import Canvas from './_canvas';
import { IGameContext } from '@/types';
import GameMenu from './_gameMenu';
import useGameLogic from '@/utils/hooks/useGameLogic';
// import Guide from '@/components/guide';
import Options from '@/components/options';

export const GameContext = createContext<IGameContext>({
  cellColor: '#32CD32',
  cellSize: 5,
  generationCount: 0,
  isRunning: false,
  overlayCellColor: '#FFFF00',
  brushPattern: null,
  speed: 50,
  aliveCount: 0,
  startGame: () => {},
  stopGame: () => {},
  clearGrid: () => {},
  applyPatternToBrush: () => {},
  removePatternFromBrush: () => {},
  closeAllMenus: () => {},
});

export default function Game() {
  const {
    grid,
    setGrid,
    isRunning,
    startGame,
    stopGame,
    clearGrid,
    applyPatternToBrush,
    removePatternFromBrush,
    brushPattern,
  } = useGameLogic();
  const [generationCount, setGenerationCount] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [cellSize, setCellSize] = useState(5);
  const [speed, setSpeed] = useState(50); // Default: 50 or 20 generations per second as fastest speed. 500 or 2 generates a second as slowest speed.
  const [cellColor, setCellColor] = useState('#32CD32'); // green
  const [overlayCellColor, setOverlayCellColor] = useState('#FFFF00'); // yellow

  const rangeRef = useRef(null);

  const [guideOpen, setGuideOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const resetGenerationCount = () => setGenerationCount(0);
  const toggleGuide = () => setGuideOpen(!guideOpen);
  const toggleOptions = () => setOptionsOpen(!optionsOpen);
  const closeAllMenus = () => {
    setGuideOpen(false);
    setOptionsOpen(false);
  };

  return (
    <main className='flex h-screen flex-col justify-center'>
      <GameContext.Provider
        value={{
          cellColor,
          cellSize,
          generationCount,
          isRunning,
          overlayCellColor,
          brushPattern,
          speed,
          aliveCount,
          startGame,
          stopGame,
          clearGrid,
          applyPatternToBrush,
          removePatternFromBrush,
          closeAllMenus,
        }}
      >
        {optionsOpen && <Options />}
        <GameMenu
          resetGenerationCount={resetGenerationCount}
          toggleGuide={toggleGuide}
          toggleOptions={toggleOptions}
          setOverlayCellColor={setOverlayCellColor}
          setCellColor={setCellColor}
          setSpeed={setSpeed}
          guideOpen={guideOpen}
          optionsOpen={optionsOpen}
        />
        {/* {guideOpen && <Guide />} */}
        {/* hidden zoom range slider */}
        <input
          className='hidden'
          type='range'
          min='2.5'
          max='95'
          value={cellSize}
          ref={rangeRef}
          id='hiddenZoomRange'
          readOnly
        />
        <Canvas
          grid={grid}
          setGrid={setGrid}
          rangeRef={rangeRef}
          setAliveCount={setAliveCount}
          setCellSize={setCellSize}
          setGenerationCount={setGenerationCount}
          removePatternFromBrush={removePatternFromBrush}
        />
      </GameContext.Provider>
    </main>
  );
}
