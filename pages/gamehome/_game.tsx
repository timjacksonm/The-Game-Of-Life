import { fetchWikiPatternById } from '@/utils/api';
import { decode } from '@/utils/decdoe';
import { useState, ChangeEvent, useRef } from 'react';
import Canvas from './_canvas';

export default function Game() {
  const [isRunning, setIsRunning] = useState(false);
  const [pattern, setPattern] = useState<number[][] | null>(null);
  const [cellSize, setCellSize] = useState(5);
  const [speed, setSpeed] = useState(50); // Default: 50 or twenty generations per second as fastest speed. 500 or 2 generates a second as slowest speed.
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

      <Canvas
        cellSize={cellSize}
        setCellSize={setCellSize}
        pattern={pattern}
        setPattern={setPattern}
        isRunning={isRunning}
        rangeRef={rangeRef}
        speed={speed}
      />
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
