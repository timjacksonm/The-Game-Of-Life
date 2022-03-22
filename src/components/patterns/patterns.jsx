import React, { useState, useEffect } from 'react';
import Loading from '../loading/loading';
import {
  useGetWikiPatternNamesQuery,
  useGetCustomPatternNamesQuery,
} from '../../services/gameoflifeapi';
import { Folders } from '../folders/folders';
import { MdDeleteForever, MdSave } from 'react-icons/md';
import Button from '../button/button';

const WikiList = ({ searchTerm, setSelected }) => {
  const { data: patternList, isFetching } = useGetWikiPatternNamesQuery();
  const [patterns, setPatterns] = useState(patternList);

  const handleSelectChange = (e) => {
    const selection = Array.from(e.target).filter(
      (option) => option.selected
    )[0];
    setSelected({ wikiCollection: selection, customCollection: null });
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

const CustomList = ({ searchTerm, setSelected }) => {
  const { data: patternList, isFetching } = useGetCustomPatternNamesQuery();
  const [patterns, setPatterns] = useState(patternList);

  const handleSelectChange = (e) => {
    const selection = Array.from(e.target).filter(
      (option) => option.selected
    )[0];
    setSelected({ wikiCollection: null, customCollection: selection });
  };

  useEffect(() => {
    const filterData = patternList?.filter((pattern) =>
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setPatterns(filterData);
  }, [patternList, searchTerm]);

  if (isFetching) {
    return <Loading className="flex-1" />;
  } else {
    return (
      <select
        onChange={(e) => handleSelectChange(e)}
        className="bg-gray-500 mx-3 h-1/2"
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

const Patterns = (props) => {
  const { setSelected, color } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({
    folder1: true,
    folder2: false,
  });

  const handleFolderChange = () => {
    setSelectedFolder({
      folder1: !selectedFolder.folder1,
      folder2: !selectedFolder.folder2,
    });
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col h-2/5 items-center p-3 overflow-hidden">
      <h1 className="font-bold">Brush Patterns</h1>
      <Folders
        state={selectedFolder}
        color={color}
        folderName1="WikiCollection"
        folderName2="CustomCollection"
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder2 && (
          <div className="flex h-1/4 font border-y-2 border-gray-400">
            <Button name="Delete Pattern">
              <MdDeleteForever size="2em" />
            </Button>
            <Button name="Save New Pattern">
              <MdSave size="2em" />
            </Button>
          </div>
        )}
        <input
          className="text-black p-1 m-3"
          placeholder="Search Patterns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedFolder.folder1 && (
          <WikiList setSelected={setSelected} searchTerm={searchTerm} />
        )}
        {selectedFolder.folder2 && (
          <CustomList setSelected={setSelected} searchTerm={searchTerm} />
        )}
      </Folders>
    </div>
  );
};

export default Patterns;
