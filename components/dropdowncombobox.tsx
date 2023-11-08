import { useState } from 'react';
import { useCombobox } from 'downshift';
import clsx from 'clsx';
import { FiStar, FiX } from 'react-icons/fi';
import { Pattern } from '@/types';

interface ComboboxProps {
  patternOptions: Pattern[];
}

const Combobox = ({ patternOptions }: ComboboxProps) => {
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
      setItems(
        patternOptions.filter((item) => {
          if (item.title && inputValue) {
            return item.title.toLowerCase().includes(inputValue.toLowerCase());
          }
          return false;
        }),
      );
    },
  });

  return (
    <div>
      {selectedItem?._id}
      <div className='flex w-3/4 flex-col gap-1'>
        <label className='w-fit' {...getLabelProps()}>
          Choose a pattern:
        </label>
        <div className='flex gap-0.5 text-black shadow-sm'>
          <input placeholder='Search...' className='w-full p-1.5' {...getInputProps()} />
          <button
            className='bg-white'
            onClick={() => {
              selectItem(null);
            }}
          >
            <FiX />
          </button>
        </div>
      </div>
      <ul
        className={'absolute z-10 mt-1 max-h-80 w-3/4 overflow-y-scroll bg-slate-400 p-0 shadow-md'}
        {...getMenuProps()}
      >
        {items.map((item, index) => (
          <li
            className={clsx(
              highlightedIndex === index && 'bg-blue-300',
              'flex px-3 py-2 shadow-sm',
            )}
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
        ))}
        {items.length === 0 && <li className='text-white'>No results found</li>}
      </ul>
    </div>
  );
};

export default Combobox;
