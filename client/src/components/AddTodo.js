import React, { useState, useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

export const AddTodo = () => {
  const [title, setTitle] = useState('');

  const { addTodo } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      completed: false,
    };

    addTodo(newTodo);

    setTitle('');
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Add to do..."
        value={title}
        style={{ flex: 10 }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <input type="submit" style={{ flex: 1 }} className="btn"></input>
    </form>
  );
};
