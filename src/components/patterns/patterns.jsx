import React, { useState, useEffect } from 'react';
import Loading from '../loading/loading';
import {
  useGetWikiPatternNamesQuery,
  useGetCustomPatternNamesQuery,
  useDeletePatternMutation,
} from '../../services/gameoflifeapi';
import { Folders } from '../folders/folders';
import { MdDeleteForever, MdSave } from 'react-icons/md';
import { SiHeroku } from 'react-icons/si';
import Button from '../button/button';
import Form from '../form/form';

const WikiList = ({ searchTerm, setSearchTerm, setSelected }) => {
  const {
    data: patternList,
    isFetching,
    isLoading,
  } = useGetWikiPatternNamesQuery();
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

  if (isLoading && !patternList) {
    return (
      <div className="p-3 flex flex-col items-center">
        <p className="flex items-end">
          <SiHeroku color="#c9c3e6" size="2em" className="mx-2" /> Heroku web
          dyno waking up. One moment please.
        </p>
        <Loading />
      </div>
    );
  }

  if (isFetching) {
    return <Loading />;
  } else {
    return (
      <>
        <input
          className="text-black p-1 m-3 zoom75:m-6 zoom50:m-9 zoom33:m-12"
          placeholder="Search Patterns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </>
    );
  }
};

const CustomList = ({ searchTerm, setSearchTerm, setSelected }) => {
  const {
    data: patternList,
    isFetching,
    isLoading,
  } = useGetCustomPatternNamesQuery();
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

  if (isLoading && !patternList) {
    return (
      <div className="p-3 flex flex-col items-center">
        <p className="flex items-end">
          <SiHeroku color="#c9c3e6" size="2em" className="mx-2" /> Heroku web
          dyno waking up. One moment please.
        </p>
        <Loading />
      </div>
    );
  }

  if (isFetching) {
    return <Loading />;
  } else {
    return (
      <>
        <input
          className="text-black p-1 m-3 zoom75:m-6 zoom50:m-9 zoom33:m-12"
          placeholder="Search Patterns"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </>
    );
  }
};

const Patterns = (props) => {
  const { setSelected, color, selected, aliveCount } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState({
    folder1: true,
    folder2: false,
  });
  const [formOpen, setFormOpen] = useState(false);
  const [deletePattern] = useDeletePatternMutation();
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

  const handleDeletePattern = () => {
    deletePattern(selected.customCollection.id);
    setSelected({
      wikiCollection: null,
      customCollection: null,
    });
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
          <div className="flex h-1/5 border-y-2 border-gray-400">
            <Button
              clickHanlder={handleDeletePattern}
              name="Delete Pattern"
              disabled={selected.customCollection ? false : true}
            >
              <MdDeleteForever size="2em" />
            </Button>
            <Button
              name="Save New Pattern"
              clickHanlder={() => setFormOpen(!formOpen)}
              disabled={aliveCount ? false : true}
            >
              <MdSave size="2em" />
            </Button>
          </div>
        )}
        {formOpen && selectedFolder.folder2 && (
          <Form setFormOpen={setFormOpen} grid={props.grid} />
        )}
        {selectedFolder.folder1 && (
          <WikiList
            setSelected={setSelected}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {selectedFolder.folder2 && !formOpen && (
          <CustomList
            setSelected={setSelected}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </Folders>
    </div>
  );
};

export default Patterns;
