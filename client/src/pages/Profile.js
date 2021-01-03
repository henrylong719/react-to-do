import React, { useState, useContext, useEffect } from 'react';
import { Col, Row, Container, Form, Table, Button } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import Message from '../components/Message';
import { GlobalContext } from '../context/GlobalState';

const Profile = ({ history }) => {
  const {
    user,
    userProfile,
    getUserProfile,
    updateUserProfile,
    todos,
    removeTodo,
  } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setSuccessMessage('');
      setPassword('');
      setConfirmPassword('');
    } else {
      const updatedUser = {
        _id: user._id,
        name: name,
        email: email,
        password: password,
      };
      updateUserProfile(user, updatedUser);
      setMessage('');
      setSuccessMessage('Successfully Update!');
      setPassword('');
      setConfirmPassword('');
    }
  };

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } else {
      if (!userProfile) {
        getUserProfile(user, 'profile');
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [user, getUserProfile, userProfile, history]);

  return (
    <>
      <Header user={user} history={history} />
      <Container fluid className="mt-2">
        <Row>
          <Col sm={3} className="mt-3">
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {successMessage && (
              <Message variant="success">{successMessage}</Message>
            )}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>confirmPassword</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>

          <Col sm={9}>
            <h2>My Todos</h2>

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
                  <td>EDIT</td>
                </tr>
              </thead>

              <tbody>
                {todos.map((todo) => (
                  <tr key={todo._id}>
                    <td>{todo._id}</td>
                    <td>{todo.createdAt.substring(0, 10)}</td>
                    <td>{todo.title}</td>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Profile;
