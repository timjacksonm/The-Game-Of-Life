import React, { useState } from 'react';

function Form({ setFormOpen, addPattern }) {
  const [state, setState] = useState({
    author: '',
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveNewPattern = (e) => {
    e.preventDefault();
    addPattern(state);
    setFormOpen(false);
  };

  return (
    <form onSubmit={saveNewPattern}>
      <p>Author:</p>
      <input
        onChange={handleInputChange}
        type="text"
        className="text-black"
        name="author"
      />
      <p>Pattern Title:</p>
      <input
        onChange={handleInputChange}
        type="text"
        className="text-black"
        name="title"
      />
      <p>Description:</p>
      <input
        onChange={handleInputChange}
        type="text"
        className="text-black"
        name="description"
      />
      <button type="Submit">Submit</button>
    </form>
  );
}

export default Form;
