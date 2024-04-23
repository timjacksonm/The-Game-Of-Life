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
  folderName1,
  folderName2,
  clickHandler,
}: FoldersProps) => {
  const folder1Background = state.folder1 ? null : 'bg-gray-700';
  const folder2Background = state.folder2 ? null : 'bg-gray-700';

  return (
    <div className='flex h-full w-full flex-col overflow-hidden bg-gray-600'>
      <div className='flex w-full justify-around'>
        <button onClick={clickHandler} className={`${folder1Background} w-full p-3 font-bold`}>
          {folderName1}
        </button>
        <button onClick={clickHandler} className={`${folder2Background} w-full p-3 font-bold`}>
          {folderName2}
        </button>
      </div>
      {children}
    </div>
  );
};
