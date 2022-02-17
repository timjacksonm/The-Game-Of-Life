import React, { useState, useEffect } from 'react';
import Loading from '../loading/loading';
import { useGetWikiPatternNamesQuery } from '../../services/gameoflifeapi';

const WikiList = ({ searchTerm, setSelected }) => {
  const { data: patternList, isFetching } = useGetWikiPatternNamesQuery();
  const [patterns, setPatterns] = useState(patternList);

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

  if (isFetching) {
    return <Loading className="" />;
  } else {
    return (
      <select
        onChange={(e) => handleSelectChange(e)}
        className="bg-gray-500 mx-3"
        size="20"
      >
        <optgroup
          label={`Currently showing ${patterns?.length} available patterns in collection!`}
        >
          {patterns?.map((pattern) => (
            <option key={pattern._id} id={pattern._id}>
              {pattern.title}
            </option>
          ))}
        </optgroup>
      </select>
    );
  }
};

// const CustomList = () => {
//   return (

//   )
// }

const Patterns = (props) => {
  const { setSelected, color } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedList, setSelectedList] = useState({
    wikiCollection: true,
    customCollection: false,
  });

  const handleListChange = () => {
    setSelectedList({
      wikiCollection: !selectedList.wikiCollection,
      customCollection: !selectedList.customCollection,
    });
    setSearchTerm('');
  };

  const wikiStyle = selectedList.wikiCollection ? { color: color } : null;
  const customStyle = selectedList.customCollection ? { color: color } : null;
  const wikiBg = !selectedList.wikiCollection ? 'bg-gray-700' : null;
  const customBg = !selectedList.customCollection ? 'bg-gray-700' : null;

  return (
    <div className="flex flex-col h-2/5 items-center p-3 overflow-hidden">
      <h1 className="font-bold">Brush Patterns</h1>
      <div className="flex flex-col bg-gray-600 w-full h-full overflow-hidden">
        <div className="flex w-full justify-around">
          <button
            onClick={handleListChange}
            className={`${wikiBg} w-full p-3 font-bold`}
            style={wikiStyle}
          >
            WikiCollection
          </button>
          <button
            onClick={handleListChange}
            className={`${customBg} w-full p-3 font-bold`}
            style={customStyle}
          >
            CustomCollection
          </button>
        </div>
        <input
          className="text-black p-1 m-3"
          placeholder="Search Patterns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedList.wikiCollection && (
          <WikiList setSelected={setSelected} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

export default Patterns;
