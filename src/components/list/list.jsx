import React from 'react';
import Loading from '../loading/loading';
import { v4 as uuidv4 } from 'uuid';
import { useGetPatternNamesQuery } from '../../services/gameoflifeapi';

const List = () => {
  const { data, isFetching } = useGetPatternNamesQuery();

  if (isFetching) return <Loading />;

  function handleBrushChange(e) {
    const selected = Array.from(e.target).filter(
      (option) => option.selected
    )[0];
    console.log(selected.value, selected.id);
  }
  return (
    <div className="flex flex-col items-center p-3 flex-1 scroll">
      <h1>Brush Patterns</h1>
      <select
        onChange={(e) => handleBrushChange(e)}
        id="dino-select"
        className="bg-gray-700 w-full"
        size="30"
      >
        <optgroup label="Default">
          <option>Single Cell</option>
        </optgroup>
        <optgroup label="customcollection">
          <option>not implemented</option>
        </optgroup>
        <optgroup label="wikicollection">
          {data.map((pattern) => (
            <option key={uuidv4()} id={pattern._id}>
              {pattern.title}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default List;
