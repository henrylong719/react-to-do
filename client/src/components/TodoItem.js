import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Card, Button } from 'react-bootstrap';

export const TodoItem = ({ todo }) => {
  const getStyle = () => {
    return {
      width: '20rem',
      textDecoration: todo.completed ? 'line-through' : 'none',
    };
  };

  const { markComplete, removeTodo, user } = useContext(GlobalContext);

  const handleRemove = () => {
    removeTodo(todo._id, user);
  };

  const handleComplete = () => {
    markComplete(todo._id, user);
  };

  return (
    <Card className="my-3 mx-2 rounded  " style={getStyle()}>
      <Card.Header> {todo.createdAt.substring(0, 10)}</Card.Header>

      <Card.Body>
        <Card.Text>
          <strong>{todo.title}</strong>
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <Button variant="light" className="btn-sm" onClick={handleComplete}>
          <i className="fas fa-check"></i>
        </Button>

        <Button
          variant="light"
          className="btn-sm float-right"
          onClick={handleRemove}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default TodoItem;

// {
/* <div style={getStyle()}>
<input
  type="checkbox"
  onChange={() => markComplete(todo._id, user)}
  checked={todo.checked}
></input>{' '}
{todo.title}
<button
  className="btn btn-dark btn-sm float-right "
  style={{ borderRadius: 5 }}
  onClick={handleRemove}
>
  X
</button>
</div> */
// }
