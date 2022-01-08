import React, { useState } from 'react';
import './styles.css';
import Options from '../options/options';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Header = ({
  start,
  setStart,
  gridValue,
  setGridValue,
  setWasRunning,
  speed,
  setSpeed,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="header">
      {showOptions ? (
        <Options
          showOptions={showOptions}
          start={start}
          setStart={setStart}
          gridValue={gridValue}
          setGridValue={setGridValue}
          setWasRunning={setWasRunning}
          speed={speed}
          setSpeed={setSpeed}
        />
      ) : (
        <h1 className="title">The Game Of Life</h1>
      )}
      <p className="flexColumnCenter noMargin">
        {showOptions ? 'Hide options' : 'Show options'}
        {showOptions ? (
          <FaAngleUp
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        ) : (
          <FaAngleDown
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        )}
      </p>
    </div>
  );
};

export default Header;
