import React, { useState } from 'react';
import { Folders } from '../folders/folders';
import Rules from '../rules/rules';

const Guide = ({ color }) => {
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
    <div className="bg-gray-600 m-3">
      <Folders
        state={selectedFolder}
        color={color}
        folderName1="Rules"
        folderName2="Tips"
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder1 && <Rules />}
        {selectedFolder.folder2 && <div className="h-screen">test</div>}
      </Folders>
    </div>
  );
};

export default Guide;
