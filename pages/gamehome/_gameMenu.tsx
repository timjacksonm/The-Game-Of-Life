// import { fetchWikiPatternById } from '@/utils/api';
// import { decode } from '@/utils/decdoe';
import { Dispatch, SetStateAction } from 'react';
// import { GameContext } from './_game';
import { GameActions } from '@/types';
import Controls from '@/components/controls';
import Guide from '@/components/guide';
import Options from '@/components/options';

interface GameControlsProps {
  gameActions: GameActions;
  resetGenerationCount: () => void;
  setPattern: Dispatch<SetStateAction<number[][] | null>>;
  setOverlayCellColor: Dispatch<SetStateAction<string>>;
  setCellColor: Dispatch<SetStateAction<string>>;
  setSpeed: Dispatch<SetStateAction<number>>;
}

export default function GameMenu({
  gameActions,
  resetGenerationCount,
} // setPattern,
// setOverlayCellColor,
// setCellColor,
: GameControlsProps) {
  // const [pickerColor, setPickerColor] = useState('#32CD32');
  // const [textBoxValue, setTextBoxValue] = useState('61de589bbec647f79484364a');

  // const handleTextBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTextBoxValue(event.target.value);
  // };

  // const loadPattern = async () => {
  //   const result = await fetchWikiPatternById(textBoxValue, { limit: 5 });
  //   if (result.rleString && result.size) {
  //     const decodedString = decode(result.rleString, result.size);
  //     setPattern(decodedString);
  //   }
  // };
  // const handleColorChange = (event: ChangeEvent<HTMLInputElement>, isOverlay?: boolean) => {
  //   if (!isOverlay) {
  //     setPickerColor(event.target.value);
  //   } else {
  //     setOverlayCellColor(event.target.value);
  //   }
  // };

  // // only applies when focus is off the color picker
  // const applyColorChange = () => {
  //   if (pickerColor) {
  //     setCellColor(pickerColor);
  //   }
  // };
  return (
    <>
      <div className='flex justify-around py-4'>
        <Guide />
        <Controls gameActions={gameActions} resetGenerationCount={resetGenerationCount} />
        <Options />

        {/* <button
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
        /> */}
      </div>
    </>
  );
}
