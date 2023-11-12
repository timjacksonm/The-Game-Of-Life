import { useState } from 'react';
import { Folders } from './folders';
import Rules from './rules';
import Info from './info';

const Guide = () => {
  const [selectedFolder, setSelectedFolder] = useState({
    folder1: true,
    folder2: false,
  });

  const handleFolderChange = () => {
    setSelectedFolder({
      folder1: !selectedFolder.folder1,
      folder2: !selectedFolder.folder2,
    });
  };

  return (
    <div className='absolute h-screen w-1/3 overflow-hidden bg-gray-600'>
      <Folders
        state={selectedFolder}
        folderName1='Rules'
        folderName2='Info'
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder1 && <Rules />}
        {selectedFolder.folder2 && <Info />}
      </Folders>
    </div>
  );
};

export default Guide;
