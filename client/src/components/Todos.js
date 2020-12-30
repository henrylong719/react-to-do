import React, { useContext, useEffect } from 'react';
import { TodoItem } from './TodoItem';

import { GlobalContext } from '../context/GlobalState';

export const Todos = () => {
  const { todos, getTodos } = useContext(GlobalContext);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo._id} />
      ))}
    </div>
  );
};
