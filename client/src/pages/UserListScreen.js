import React, { useContext, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { GlobalContext } from '../context/GlobalState';

const UserListScreen = ({ history }) => {
  const {
    user,
    allUsers,
    getAllUsers,
    deleteUser,
    success,
    successAck,
  } = useContext(GlobalContext);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      deleteUser(user, id);
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else {
      if (!allUsers || success) {
        getAllUsers(user);
        successAck();
      }
    }
  }, [user, getAllUsers, allUsers, history, success, successAck]);

  return (
    <>
      <Header user={user} history={history} />

      <Container fluid className="mt-3">
        <h1>Users</h1>
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>{' '}
                    {!user.isAdmin && (
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserListScreen;
