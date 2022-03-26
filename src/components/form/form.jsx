import React, { useState } from 'react';
import { useAddCustomPatternMutation } from '../../services/gameoflifeapi';
import Errormsg from '../errormsg/errormsg';

function Form({ setFormOpen, grid }) {
  const [state, setState] = useState({
    author: '',
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    author: null,
    title: null,
    desription: null,
    rleString: null,
  });

  const [addPattern] = useAddCustomPatternMutation();

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  function encodeRow(arr) {
    let encoding = [],
      i,
      previous,
      count;

    if (arr.length === 1) {
      arr[0] ? encoding.push('o$') : encoding.push('b$');
      return encoding;
    }

    for (count = 1, previous = arr[0], i = 1; i <= arr.length; i++) {
      if (arr[i] !== previous) {
        if (count === 1) {
          if (previous) {
            encoding.push('o');
          } else {
            encoding.push('b');
          }
        } else {
          if (previous) {
            encoding.push(count, 'o');
          } else {
            encoding.push(count, 'b');
          }
        }
        count = 1;
        previous = arr[i];
      } else {
        count++;
      }
    }

    //finish row
    encoding.push('$');
    return encoding.join('');
  }

  const saveNewPattern = async (e) => {
    e.preventDefault();
    let minY = grid
      .map((row) => row.findIndex((value) => value))
      .filter((value) => value > 0)
      .sort((a, b) => a - b)[0];
    const gridCopy = [...grid];
    //remove empty rows until a row contains alive cells.
    while (gridCopy[0].every((value) => !value)) {
      gridCopy.shift();
    }
    gridCopy.reverse();
    while (gridCopy[0].every((value) => !value)) {
      gridCopy.shift();
    }
    gridCopy.reverse();

    let newGrid = gridCopy.map((row, index, array) => {
      if (row.every((value) => !value)) {
        //inbetween row
        return row.slice(minY);
      }
      let start = minY;
      row.reverse();
      let end = row.length - row.findIndex((value) => value);
      row.reverse();
      const rowToConvert = row.slice(start, end);
      return rowToConvert;
    });
    const maxLengths = newGrid
      .filter((array) => array.find((value) => value))
      .sort((a, b) => b.length - a.length);
    const x = maxLengths[0].length;
    const y = newGrid.length;
    newGrid = newGrid.map((array) => {
      if (array.length !== x) {
        if (array.every((value) => !value)) {
          array.length = x;
          return array;
        } else {
          return array.concat(new Array(Math.abs(array.length - x)).fill(0));
        }
      } else {
        return array;
      }
    });

    let rleString = newGrid.map((row) => {
      const result = encodeRow(row);
      return result;
    });
    rleString.push('!');
    rleString = rleString.join('');

    if (!rleString) {
      setErrors({
        author: null,
        title: null,
        desription: null,
        rleString: 'There are no alive cells on screen to save',
      });
      return;
    }

    const formData = {
      ...state,
      description: [state.description],
      size: { x: x, y: y },
      rleString: rleString,
    };
    const response = await addPattern(formData);
    if (response.error) {
      const errorList = response.error.data.message.errors;
      setErrors(
        errorList.reduce((obj, currentValue) => {
          if (!obj[currentValue.param]) {
            obj[currentValue.param] = currentValue.msg;
          }
          return obj;
        }, {})
      );
    } else {
      setFormOpen(false);
    }
  };

  const removeMsg = (e) => {
    e.stopPropagation();
    setErrors({ ...errors, [e.currentTarget.id]: null });
  };

  return (
    <form onSubmit={saveNewPattern} className="overflow-auto flex flex-col">
      {errors.rleString && (
        <Errormsg
          id="rleString"
          clickHandler={removeMsg}
          message={errors.rleString}
        />
      )}
      {errors.title && (
        <Errormsg id="title" clickHandler={removeMsg} message={errors.title} />
      )}
      <div className="flex justify-center w-4/5">
        <p className="m-3 font-bold flex-1 text-right">Title:</p>
        <input
          onChange={handleInputChange}
          type="text"
          className="text-black m-2"
          name="title"
          autoComplete="off"
        />
      </div>
      {errors.author && (
        <Errormsg
          id="author"
          message={errors.author}
          clickHandler={removeMsg}
        />
      )}
      <div className="flex justify-center w-4/5">
        <p className="m-3 font-bold flex-1 text-right">Author:</p>
        <input
          onChange={handleInputChange}
          type="text"
          className="text-black m-2"
          name="author"
          autoComplete="off"
        />
      </div>
      {errors.description && (
        <Errormsg
          id="description"
          clickHandler={removeMsg}
          message={errors.description}
        />
      )}
      <div className="flex justify-center w-4/5 mb-3">
        <p className="m-3 font-bold flex-1 text-right">Description:</p>
        <input
          onChange={handleInputChange}
          type="text"
          className="text-black m-2"
          name="description"
          autoComplete="off"
        />
      </div>
      <button
        type="Submit"
        className="w-1/4 m-auto font-bold rounded-md border-2 border-gray-400 hover:bg-gray-700"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
