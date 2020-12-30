import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TodoItem = ({ todo }) => {
  const getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: todo.completed ? 'line-through' : 'none',
    };
  };

  const btnStyle = {
    float: 'right',
    background: '#555',
    border: 'none',
    padding: '5px 9px',
    color: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
  };

  const { markComplete, removeTodo } = useContext(GlobalContext);

  return (
    <div style={getStyle()}>
      <input
        type="checkbox"
        onChange={() => markComplete(todo._id)}
        checked={todo.checked}
      ></input>{' '}
      {todo.title}
      <button style={btnStyle} onClick={() => removeTodo(todo._id)}>
        X
      </button>
    </div>
  );
};

export default TodoItem;
