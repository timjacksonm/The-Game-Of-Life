import { GameContext } from '@/pages/gamehome/_game';
import { useContext } from 'react';

function Settings() {
  const {
    cellColor,
    overlayCellColor,
    speed,
    pickerColor,
    handleColorChange,
    applyColorChange,
    handleSpeedChange,
  } = useContext(GameContext);
  return (
    <div className='p-2'>
      <h1 className='text-center underline'>Work in Progress</h1>
      <p>{`Cell Color: ${cellColor}`}</p>
      <p>{`Overlay Cell Color: ${overlayCellColor}`}</p>
      <p>{`Current Speed: ${speed}`}</p>

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
      <input
        className='m-2 w-48 whitespace-nowrap bg-blue-500 px-4 py-2'
        type='range'
        min='-500'
        max='-50'
        step={50}
        value={speed}
        onChange={handleSpeedChange}
        id='speedRange'
      />
    </div>
  );
}

export default Settings;
