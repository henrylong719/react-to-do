import React, { useContext, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { Row, Col, Container } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';

export const Todos = () => {
  const { todos, getMyTodos, user } = useContext(GlobalContext);

  useEffect(() => {
    if (!todos) {
      getMyTodos(user);
    }
  }, [getMyTodos, user, todos]);

  return (
    <div>
      {/* {console.log(todos)} */}

      <Container fluid>
        <Row className="no-gutters">
          {todos &&
            todos.map((todo) => (
              <Col key={todo._id} sm={12} md={6} lg={4} xl={3}>
                <TodoItem todo={todo} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};
