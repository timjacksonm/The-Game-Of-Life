import React from 'react';

export const Folders = ({
  children,
  state,
  folderName1,
  folderName2,
  color,
  clickHandler,
}) => {
  const folder1Style = state.folder1 ? { color: color } : null;
  const folder2Style = state.folder2 ? { color: color } : null;
  const folder1Background = state.folder1 ? null : 'bg-gray-700';
  const folder2Background = state.folder2 ? null : 'bg-gray-700';

  return (
    <div className="flex flex-col bg-gray-600 w-full h-full overflow-hidden">
      <div className="flex w-full justify-around">
        <button
          onClick={clickHandler}
          className={`${folder1Background} w-full p-3 font-bold`}
          style={folder1Style}
        >
          {folderName1}
        </button>
        <button
          onClick={clickHandler}
          className={`${folder2Background} w-full p-3 font-bold`}
          style={folder2Style}
        >
          {folderName2}
        </button>
      </div>
      {children}
    </div>
  );
};
