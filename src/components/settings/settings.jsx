import React from 'react';
import Button from '../button/button';
import defaultGrid from '../../utils';
import { randomGrid } from '../../utils';
import { FaRandom } from 'react-icons/fa';
import { BsGrid3X3 } from 'react-icons/bs';

const Settings = ({
  setGrid,
  setGenCount,
  windowSize,
  gridGap,
  cellSize,
  speed,
  setSpeed,
  color,
  setColor,
}) => {
  const handleReset = () => {
    setGenCount(0);
    setGrid(defaultGrid(windowSize, gridGap, cellSize));
  };
  const handleRandom = () => setGrid(randomGrid(windowSize, gridGap, cellSize));
  const handleSpeedChange = (e) => setSpeed(Number(e.target.value));
  const handleColorChange = (e) => setColor(e.target.value);

  return (
    <div className="flex flex-col items-center p-3 flex-1">
      <h1 className="font-bold">Settings</h1>
      <div className="bg-gray-600 w-full h-full flex flex-col">
        <div className="flex h-1/2 border-y-2 border-gray-400">
          <Button name="Reset" clickHanlder={() => handleReset()}>
            <BsGrid3X3 size="1.75em" />
          </Button>
          <Button name="Random" clickHanlder={() => handleRandom()}>
            <FaRandom size="1.75em" />
          </Button>
        </div>
        <h2 className="my-3 h-1/2 flex justify-around items-center">
          <div>
            Theme Color:
            <input
              onChange={(e) => handleColorChange(e)}
              value={color}
              className="mx-3"
              type="color"
            />
          </div>
          <div>
            Speed:
            <input
              className="mx-3"
              onChange={(e) => handleSpeedChange(e)}
              type="range"
              step="50"
              min="-1000"
              max="-50"
              value={speed}
            />
          </div>
        </h2>
      </div>
    </div>
  );
};

export default Settings;
