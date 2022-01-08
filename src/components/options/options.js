import React, { useRef } from 'react';
import Button from '../button/button';
import './styles.css';

const Options = ({
  start,
  setStart,
  setWasRunning,
  gridValue,
  setGridValue,
  showOptions,
}) => {
  const slider = useRef();

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
      <Button name="Load Template" action={() => console.log('load')} />
      <Button name="Save Template" action={() => console.log('save')} />
      <div className="label">
        <p>cell count</p>
        <input
          onChange={(e) => {
            setGridValue(e.target.value);
          }}
          ref={slider}
          type="range"
          min="4"
          max="80"
          step="4"
          value={gridValue}
          className="slider"
          id="myRange"
        />
      </div>

      <div className="label">
        <p>speed</p>
        <input type="range" min="1" max="10" />
      </div>
    </div>
  );
};

export default Options;
