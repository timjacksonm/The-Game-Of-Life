import React, { useState, useEffect } from 'react';
import Grid from './components/grid/grid';
import Header from './components/header/header';
import { useArray } from './components/hooks';

import { create2dArray } from './helperFunctions';

let intervalId;

const App = () => {
  const [start, setStart] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);
  const [gridSize, setGridSize] = useState(16);
  const [speed, setSpeed] = useState(-600);

  const {
    array,
    saveTemplate,
    loadTemplate,
    modifyClickedCell,
    increaseSize,
    decreaseSize,
    createNext2dArray,
    clear,
  } = useArray(create2dArray(gridSize, gridSize));

  useEffect(() => {
    //if grid size slider is adjusted re-create 2dArray. Start simulation again
    if (array.length < gridSize) {
      increaseSize(gridSize);
    }
    if (array.length > gridSize) {
      decreaseSize(gridSize);
    }
    if (wasRunning) {
      setStart(true);
      setWasRunning(false);
    }
  }, [gridSize]);

  useEffect(() => {
    //if speed slider is adjusted and wasRunning is true. Start simulation again
    if (wasRunning) {
      setStart(true);
      setWasRunning(false);
    }
  }, [speed]);

  useEffect(() => {
    //start simulation
    //if start is true create next iteration of 2dArray based on rules. setInterval speed based on speed slider
    if (start) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        createNext2dArray(gridSize, gridSize);
      }, Math.abs(speed));
    } else {
      clearInterval(intervalId);
    }
  }, [start]);

  return (
    <div>
      <Header
        start={start}
        setStart={setStart}
        setWasRunning={setWasRunning}
        gridSize={gridSize}
        setGridSize={setGridSize}
        speed={speed}
        setSpeed={setSpeed}
        clear={clear}
      />
      <Grid
        array={array}
        gridSize={gridSize}
        modifyClickedCell={modifyClickedCell}
      />
    </div>
  );
};

export default App;
