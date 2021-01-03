import React, { useState, useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

export const AddTodo = () => {
  const [title, setTitle] = useState('');

  const { addTodo, user } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title) {
      const newTodo = {
        title,
        completed: false,
      };

      addTodo(newTodo, user);
      setTitle('');
    }
  };

  // console.log(success);

  return (
    <form className="d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder=" Add to do..."
        value={title}
        style={{ flex: 10 }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input
        type="submit"
        style={{ flex: 1 }}
        className="btn btn-dark "
      ></input>
    </form>
  );
};
