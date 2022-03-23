import React, { useState } from 'react';
import { useAddCustomPatternMutation } from '../../services/gameoflifeapi';
import Button from '../button/button';
import Errormsg from '../errormsg/errormsg';

function Form({ setFormOpen }) {
  const [state, setState] = useState({
    author: '',
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    author: null,
    title: null,
    desription: null,
  });

  const [addPattern] = useAddCustomPatternMutation();

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveNewPattern = async (e) => {
    e.preventDefault();
    const response = await addPattern(state);
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
      <div className="flex justify-center w-4/5">
        <p className="m-3 font-bold flex-1 text-right">Title:</p>
        {errors.title && (
          <Errormsg
            id="title"
            clickHandler={removeMsg}
            message={errors.title}
          />
        )}
        <input
          onChange={handleInputChange}
          type="text"
          className="text-black m-2"
          name="title"
          autocomplete="off"
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
          autocomplete="off"
        />
      </div>
      <div className="flex justify-center w-4/5 mb-3">
        <p className="m-3 font-bold flex-1 text-right">Description:</p>
        {errors.description && (
          <Errormsg
            id="description"
            clickHandler={removeMsg}
            message={errors.description}
          />
        )}
        <input
          onChange={handleInputChange}
          type="text"
          className="text-black m-2"
          name="description"
          autocomplete="off"
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
