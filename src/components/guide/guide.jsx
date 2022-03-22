import React, { useState } from 'react';
import { Folders } from '../folders/folders';
import Rules from '../rules/rules';
import Tips from '../tips/tips';

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
    <div className="bg-gray-600 m-3 zoom50:m-6 zoom25:m-9">
      <Folders
        state={selectedFolder}
        color={color}
        folderName1="Rules"
        folderName2="Tips"
        clickHandler={handleFolderChange}
      >
        {selectedFolder.folder1 && <Rules />}
        {selectedFolder.folder2 && <Tips />}
      </Folders>
    </div>
  );
};

export default Guide;
