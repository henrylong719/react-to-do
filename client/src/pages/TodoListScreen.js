import React, { useContext, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import Header from '../components/Layout/Header';
import Paginate from '../components/Paginate';

const TodoListScreen = ({ history, match }) => {
  const {
    allTodos,
    getAllTodos,
    user,
    listToDoPage,
    listToDoPages,
    removeTodo,
    success,
    removeTodoAck,
  } = useContext(GlobalContext);

  const pageNumber = Number(match.params.pageNumber || 1);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else {
      if (
        (!allTodos && user.isAdmin) ||
        listToDoPage !== pageNumber ||
        success
      ) {
        getAllTodos(user, pageNumber);
        removeTodoAck();
      }
    }
  }, [
    history,
    getAllTodos,
    allTodos,
    listToDoPage,
    user,
    pageNumber,
    success,
    removeTodoAck,
  ]);

  return (
    <>
      <Header history={history} user={user} />

      <Container fluid className="mt-3">
        <h1>All Todos</h1>
        <Table
          striped
          responsive
          hover
          bordered
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <td>ID</td>
              <td>DATE</td>
              <td>TODOS</td>
              <td>USER</td>
              <td>EDIT</td>
            </tr>
          </thead>

          <tbody>
            {allTodos &&
              allTodos.map((todo) => (
                <tr key={todo._id}>
                  <td>{todo._id}</td>
                  <td>{todo.createdAt.substring(0, 10)}</td>
                  <td>{todo.title}</td>
                  <td>{todo.user.name}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => removeTodo(todo._id, user)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Paginate page={pageNumber} pages={listToDoPages}></Paginate>
      </Container>
    </>
  );
};

export default TodoListScreen;
