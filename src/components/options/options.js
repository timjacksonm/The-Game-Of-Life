import React from 'react';
import Button from '../button/button';
import './styles.css';

const Options = ({ props, showOptions }) => {
  const {
    start,
    setStart,
    setWasRunning,
    gridSize,
    setGridSize,
    speed,
    setSpeed,
    clear,
    loadTemplate,
  } = props;

  function handleGridChange(event) {
    const inputValue = Number(event.target.value);
    if (start) {
      setStart(false);
      setWasRunning(true);
    }
    setGridSize(inputValue);
  }

  function handleSpeedChange(event) {
    const inputValue = Number(event.target.value);
    if (start) {
      setStart(false);
      setWasRunning(true);
    }
    setSpeed(inputValue);
  }

  function handleClickToClear() {
    if (start) {
      setStart(false);
      setWasRunning(false);
    }
    clear(gridSize);
  }

  function handleLoadTemplate() {
    if (start) {
      setStart(false);
      setWasRunning(true);
    }
    const templateArray = JSON.parse(require('../../template.json'));
    setGridSize(templateArray.length);
    loadTemplate(templateArray, gridSize);
  }

  return (
    <div
      className={showOptions ? 'optionsContainer' : 'optionsContainer hidden'}
    >
      {!start ? (
        <Button name="Start" action={() => setStart(true)} />
      ) : (
        <Button
          name="Pause"
          action={() => {
            setStart(false);
            setWasRunning(false);
          }}
        />
      )}
      <Button name="Clear" action={handleClickToClear} />
      <Button name="Load Template" action={handleLoadTemplate} />
      <Button name="Save Template" action={() => console.log('save')} />
      <div className="label">
        <p>grid size</p>
        <input
          onChange={handleGridChange}
          type="range"
          min="4"
          max="80"
          step="4"
          value={gridSize}
          className="slider"
          id="myRange"
        />
      </div>

      <div className="label">
        <p>speed</p>
        <input
          onChange={handleSpeedChange}
          type="range"
          step="100"
          min="-1000"
          max="-200"
          value={speed}
        />
      </div>
    </div>
  );
};

export default Options;
