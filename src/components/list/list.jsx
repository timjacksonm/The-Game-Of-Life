import React, { useState, useEffect } from 'react';
import Loading from '../loading/loading';
import { useGetWikiPatternNamesQuery } from '../../services/gameoflifeapi';

const List = ({ setSelected }) => {
  const { data: patternList, isFetching } = useGetWikiPatternNamesQuery();
  const [patterns, setPatterns] = useState(patternList);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChange = (e) => {
    const selection = Array.from(e.target).filter(
      (option) => option.selected
    )[0];
    setSelected(selection);
  };

  useEffect(() => {
    const filterData = patternList?.filter((pattern) =>
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPatterns(filterData);
  }, [patternList, searchTerm]);

  if (isFetching)
    return (
      <div className="flex flex-col items-center bg-gray-600 w-full h-full p-3">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col h-2/5 items-center p-3 overflow-hidden">
      <h1 className="font-bold">Brush Patterns</h1>
      <div className="flex flex-col bg-gray-600 w-full h-full overflow-hidden">
        <input
          className="text-black p-1 m-3"
          placeholder="Search Patterns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => handleSelectChange(e)}
          className="bg-gray-700 w-full"
          size="20"
        >
          <optgroup label="customcollection">
            <option>not implemented</option>
          </optgroup>
          <optgroup label={`wikicollection: ${patterns?.length} patterns`}>
            {patterns?.map((pattern) => (
              <option key={pattern._id} id={pattern._id}>
                {pattern.title}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default List;
