import { useState, useEffect } from 'react';
import { useCombobox } from 'downshift';
import clsx from 'clsx';
import { FiStar, FiX } from 'react-icons/fi';
import { generatePatternFilter } from '@/utils/helpers';
import { usePatterns } from '@/utils/api/hooks/usePatterns';
import LoadingIcon from './loader';

interface ComboboxProps {
  setPatternToView: (patternId: string) => void;
  clearSelectedPattern: () => void;
}

const Combobox = ({ setPatternToView, clearSelectedPattern }: ComboboxProps) => {
  const { patternOptions, totalCount, isLoading, isSuccess, error } = usePatterns();

  const [items, setItems] = useState(patternOptions);
  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items,
    isOpen: true,
    // itemToString handles the value that is displayed in the input
    itemToString: (item) => item?.title ?? '',
    onInputValueChange: ({ inputValue }) => {
      setItems(patternOptions.filter(generatePatternFilter(inputValue)));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setItems(patternOptions);
    }
  }, [patternOptions, isSuccess]);

  useEffect(() => {
    setPatternToView(selectedItem?._id ?? '');
  }, [selectedItem, setPatternToView]);

  const handleClearSelection = () => {
    selectItem(null);
    clearSelectedPattern();
  };

  if (error) {
    return;
  }

  const renderContent = () => {
    if (error) {
      return <div>Error fetching data</div>;
    }

    if (isLoading) {
      return <LoadingIcon />;
    }

    if (isSuccess && !items.length) {
      return <li className='text-white'>No results found</li>;
    }

    return items.map((item, index) => (
      <li
        className={clsx(highlightedIndex === index && 'bg-blue-300', 'flex px-3 py-2 shadow-sm')}
        key={item._id}
        {...getItemProps({ item, index })}
      >
        {item.favorite && <FiStar fill='yellow' />}
        <div
          className={clsx(
            selectedItem === item && 'font-bold text-blue-500',
            'flex flex-col text-white',
          )}
        >
          <span className='text-lg'>{item.title}</span>
          <span className='text-sm text-gray-600'>{item.author}</span>
        </div>
      </li>
    ));
  };

  return (
    <div>
      <h1>{`Total available patterns: ${totalCount}`}</h1>
      <div className='flex w-11/12 flex-col gap-1'>
        <label className='w-fit' {...getLabelProps()}>
          Choose a pattern:
        </label>
        <div className='relative flex gap-0.5 text-black shadow-sm'>
          <input placeholder='Search...' className='w-full p-1.5 pr-10' {...getInputProps()} />
          <button
            className='absolute right-2 top-1/2 -translate-y-1/2 transform bg-white p-2'
            onClick={handleClearSelection}
          >
            <FiX />
          </button>
        </div>
      </div>
      <ul
        className={'z-10 mt-1 h-96 w-11/12 overflow-y-scroll bg-slate-400 p-0 shadow-md'}
        {...getMenuProps()}
      >
        {renderContent()}
      </ul>
    </div>
  );
};

export default Combobox;
