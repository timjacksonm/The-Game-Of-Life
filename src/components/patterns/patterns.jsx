import React, { useState, useEffect, useRef } from 'react';
import Loading from '../loading/loading';
import {
  useGetWikiPatternNamesQuery,
  useGetCustomPatternNamesQuery,
  useAddCustomPatternMutation,
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
        className="bg-gray-500 mx-3 h-1/2 zoom75:mx-6 zoom50:mx-9 zoom33:mx-12"
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
  const { setSelected, color, selected } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({
    folder1: true,
    folder2: false,
  });
  const [formOpen, setFormOpen] = useState(false);
  const [addPattern, data] = useAddCustomPatternMutation();
  const [state, setState] = useState({
    author: '',
    title: '',
    description: '',
  });

  const handleFolderChange = () => {
    setSelectedFolder({
      folder1: !selectedFolder.folder1,
      folder2: !selectedFolder.folder2,
    });
    setSelected({
      wikiCollection: null,
      customCollection: null,
    });
    setSearchTerm('');
    setFormOpen(false);
  };

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDeletePattern = () => {
    //not implemented
  };

  const handleSavePattern = () => {
    setFormOpen(!formOpen);
  };

  const saveNewPattern = (e) => {
    e.preventDefault();
    addPattern(state);
  };

  return (
    <div className="flex flex-col h-2/5 items-center p-3 overflow-hidden zoom50:p-6 zoom25:p-9">
      <h1 className="font-bold">Brush Patterns</h1>
      <Folders
        state={selectedFolder}
        color={color}
        folderName1="WikiCollection"
        folderName2="CustomCollection"
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder2 && (
          <div className="flex h-1/5 font border-y-2 border-gray-400">
            <Button
              clickHanlder={handleDeletePattern}
              name="Delete Pattern"
              disabled={selected.customCollection ? false : true}
            >
              <MdDeleteForever size="2em" />
            </Button>
            <Button name="Save New Pattern" clickHanlder={handleSavePattern}>
              <MdSave size="2em" />
            </Button>
          </div>
        )}
        {formOpen && selectedFolder.folder2 && (
          <form onSubmit={saveNewPattern}>
            <p>Author:</p>
            <input
              onChange={handleInputChange}
              type="text"
              className="text-black"
              name="author"
            />
            <p>Pattern Title:</p>
            <input
              onChange={handleInputChange}
              type="text"
              className="text-black"
              name="title"
            />
            <p>Description:</p>
            <input
              onChange={handleInputChange}
              type="text"
              className="text-black"
              name="description"
            />
            <button type="Submit">Submit</button>
          </form>
        )}
        <input
          className="text-black p-1 m-3 zoom75:m-6 zoom50:m-9 zoom33:m-12"
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
