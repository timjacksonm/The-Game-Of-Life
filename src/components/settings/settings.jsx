import React from 'react';
import Button from '../button/button';
import defaultGrid from '../../utils';
import { randomGrid } from '../../utils';
import { FaRandom } from 'react-icons/fa';
import { BsGrid3X3 } from 'react-icons/bs';

const Settings = ({ setGrid, windowSize, gridGap, cellSize }) => {
  const handleReset = () => setGrid(defaultGrid(windowSize, gridGap, cellSize));
  const handleRandom = () => setGrid(randomGrid(windowSize, gridGap, cellSize));

  return (
    <div className="h-1/3 flex flex-col items-center p-3">
      <h1 className="font-bold">Settings</h1>
      <div className="bg-gray-600 w-full h-full p-3 flex flex-col">
        <div className="flex my-3">
          <Button name="Reset" clickHanlder={() => handleReset()}>
            <BsGrid3X3 size="2em" title="Reset" />
          </Button>
          <Button name="Random" clickHanlder={() => handleRandom()}>
            <FaRandom size="2em" title="Random" />
          </Button>
        </div>
        <h2 className="my-3 flex">
          Theme Color:
          <input className="mx-3" type="color" />
        </h2>
        <h2 className="my-3 flex">
          Speed:
          <input
            className="mx-3"
            onChange={() => ''}
            type="range"
            step="100"
            min="-1000"
            max="-200"
          />
        </h2>
      </div>
    </div>
  );
};

export default Settings;
