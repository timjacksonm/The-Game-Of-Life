import { ReactNode } from 'react';

interface FoldersProps {
  children: ReactNode;
  state: { folder1: boolean; folder2: boolean };
  color?: string;
  folderName1: string;
  folderName2: string;
  clickHandler: () => void;
}

export const Folders = ({
  children,
  state,
  // color = 'blue',
  folderName1,
  folderName2,
  clickHandler,
}: FoldersProps) => {
  // const folder1Style = state.folder1 ? { color: color } : null;
  // const folder2Style = state.folder2 ? { color: color } : null;
  const folder1Background = state.folder1 ? null : 'bg-gray-700';
  const folder2Background = state.folder2 ? null : 'bg-gray-700';

  return (
    <div className='flex h-full w-full flex-col overflow-hidden bg-gray-600'>
      <div className='flex w-full justify-around'>
        <button
          onClick={clickHandler}
          className={`${folder1Background} zoom75:p-4 zoom50:p-10 zoom33:p-16 zoom25:p-20 w-full p-3 font-bold`}
          // style={folder1Style}
        >
          {folderName1}
        </button>
        <button
          onClick={clickHandler}
          className={`${folder2Background} zoom75:p-4 zoom50:p-10 zoom33:p-16 zoom25:p-20 w-full p-3 font-bold`}
          // style={folder2Style}
        >
          {folderName2}
        </button>
      </div>
      {children}
    </div>
  );
};
