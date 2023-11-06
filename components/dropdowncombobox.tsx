import { useState } from 'react';
import { useCombobox } from 'downshift';
import clsx from 'clsx';

function ComboBoxExample(props) {
  const books = props.data?.results ?? [];
  function getBooksFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return function booksFilter(book) {
      return (
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue)
      );
    };
  }

  function ComboBox() {
    const [items, setItems] = useState(books);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        setItems(books.filter(getBooksFilter(inputValue)));
      },
      items,
      isOpen: true,
      itemToString(item) {
        return item ? item.title : '';
      },
    });

    return (
      <div>
        <div className='flex w-72 flex-col gap-1'>
          <label className='w-fit' {...getLabelProps()}>
            Choose your favorite book:
          </label>
          <div className='flex gap-0.5 bg-white shadow-sm'>
            <input
              placeholder='Best book ever'
              className='w-full p-1.5 text-black'
              {...getInputProps()}
            />
            <button
              aria-label='toggle menu'
              className='px-2'
              type='button'
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul
          className={`absolute z-10 mt-1 max-h-80 w-72 overflow-scroll bg-white p-0 shadow-md ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index && 'bg-blue-300',
                  selectedItem === item && 'font-bold',
                  'flex flex-col px-3 py-2 text-black shadow-sm',
                )}
                key={item._id}
                {...getItemProps({ item, index })}
              >
                <span>{item.title}</span>
                <span className='text-sm text-gray-700'>{item.author}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
}

export default ComboBoxExample;
