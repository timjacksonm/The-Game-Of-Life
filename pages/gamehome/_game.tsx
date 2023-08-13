import { fetchWikiPatternById } from '@/utils/api';
import { decode } from '@/utils/decdoe';
import { useState, ChangeEvent, useRef, createContext } from 'react';
import Canvas from './_canvas';
import { IGameContext } from '@/types';

export const GameContext = createContext<IGameContext>({
  overlayCellColor: '#FFFF00',
  cellColor: '#32CD32',
  pattern: null,
  setPattern: () => void 0,
});

export default function Game() {
  const [isRunning, setIsRunning] = useState(false);
  const [pattern, setPattern] = useState<number[][] | null>(null);
  const [cellSize, setCellSize] = useState(5);
  const [speed, setSpeed] = useState(50); // Default: 50 or twenty generations per second as fastest speed. 500 or 2 generates a second as slowest speed.
  const [pickerColor, setPickerColor] = useState('#32CD32');
  const [cellColor, setCellColor] = useState('#32CD32'); // green
  const [overlayCellColor, setOverlayCellColor] = useState('#FFFF00'); // yellow
  const [textBoxValue, setTextBoxValue] = useState('61de589bbec647f79484364a');
  const rangeRef = useRef(null);

  const handleTextBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextBoxValue(event.target.value);
  };

  const loadPattern = async () => {
    const result = await fetchWikiPatternById(textBoxValue, { limit: 5 });
    if (result.rleString && result.size) {
      const decodedString = decode(result.rleString, result.size);
      setPattern(decodedString);
    }
  };
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>, isOverlay?: boolean) => {
    if (!isOverlay) {
      setPickerColor(event.target.value);
    } else {
      setOverlayCellColor(event.target.value);
    }
  };

  // only applies when focus is off the color picker
  const applyColorChange = () => {
    if (pickerColor) {
      setCellColor(pickerColor);
    }
  };

  return (
    <main className='flex h-screen flex-col'>
      <div className='flex'>
        <button
          className='m-2 w-min whitespace-nowrap bg-blue-500 px-4 py-2'
          onClick={() => setIsRunning(!isRunning)}
        >
          {`${!isRunning ? 'Start' : 'Stop'} Simulation`}
        </button>
        <button
          className='m-2 w-min whitespace-nowrap bg-blue-500 px-4 py-2'
          onClick={() => void loadPattern()}
        >
          Load Pattern
        </button>
        <div>
          <input
            className='border border-cyan-200 bg-black p-5 text-white'
            type='text'
            value={textBoxValue}
            onChange={handleTextBoxChange}
          />
        </div>
      </div>
      <input
        className='m-2 hidden w-full whitespace-nowrap bg-blue-500 px-4 py-2'
        type='range'
        min='2.5'
        max='95'
        value={cellSize}
        ref={rangeRef}
        id='hiddenZoomRange'
        readOnly
      />
      <input
        className='m-2 w-48 whitespace-nowrap bg-blue-500 px-4 py-2'
        type='range'
        min='-500'
        max='-50'
        step={50}
        value={speed}
        onChange={(event) => setSpeed(parseInt(event.target.value))}
        id='speedRange'
      />
      <div className='m-2'>
        <label htmlFor='overlayColorPicker' className='mr-2'>
          Overlay Color:
        </label>
        <input
          id='overlayColorPicker'
          type='color'
          value={overlayCellColor}
          onChange={(event) => handleColorChange(event, true)}
        />
        <label htmlFor='overlayColorPicker' className='mx-2'>
          Cell Color:
        </label>
        <input
          id='cellColorPicker'
          type='color'
          value={pickerColor}
          onChange={handleColorChange}
          onBlur={applyColorChange}
        />
      </div>

      <GameContext.Provider value={{ overlayCellColor, cellColor, pattern, setPattern }}>
        <Canvas
          cellSize={cellSize}
          setCellSize={setCellSize}
          isRunning={isRunning}
          rangeRef={rangeRef}
          speed={speed}
        />
      </GameContext.Provider>
    </main>
  );
}

// useEffect(() => {
//   const fetchData = async () => {
//     const result = await fetchWikiPatternById("asdf", { limit: 5 });
//     setAllPatterns(result);
//   };

//   void fetchData();
// }, []);
