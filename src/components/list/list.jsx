import React from 'react';
import Loading from '../loading/loading';
import { useGetPatternNamesQuery } from '../../services/gameoflifeapi';

const List = ({ setSelected }) => {
  const { data, isFetching } = useGetPatternNamesQuery();

  const handleSelectChange = (e) => {
    const selection = Array.from(e.target).filter(
      (option) => option.selected
    )[0];
    setSelected(selection);
  };

  if (isFetching)
    return (
      <div className="flex flex-col items-center p-3 flex-1 scroll">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col h-2/5 items-center p-3 scroll">
      <h1 className="font-bold">Brush Patterns</h1>
      <select
        onChange={(e) => handleSelectChange(e)}
        className="bg-gray-700 w-full"
        size="20"
      >
        <optgroup label="Default">
          <option>Single Cell</option>
        </optgroup>
        <optgroup label="customcollection">
          <option>not implemented</option>
        </optgroup>
        <optgroup label={`wikicollection: ${data.length} patterns`}>
          {data.map((pattern) => (
            <option key={pattern._id} id={pattern._id}>
              {pattern.title}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default List;
