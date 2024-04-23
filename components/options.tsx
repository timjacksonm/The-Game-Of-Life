import { Folders } from './folders';
import { useState } from 'react';
import Settings from './settings';
import Patterns from './patterns';

export default function Options() {
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
    <div className='h-screen w-full overflow-hidden bg-gray-600'>
      <Folders
        state={selectedFolder}
        folderName1='Patterns'
        folderName2='Settings'
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder1 && <Patterns />}
        {selectedFolder.folder2 && <Settings />}
      </Folders>
    </div>
  );
}
