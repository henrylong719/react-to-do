import React, { useState, useEffect, useContext } from 'react';
import FromContainer from '../components/FromContainer';
import { Form, Button } from 'react-bootstrap';
import Header from '../components/Layout/Header';
import { GlobalContext } from '../context/GlobalState';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const UserEditScreen = ({ history, match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const [message, setMessage] = useState('');

  const userId = match.params.id;

  const {
    user,
    updateUser,
    userProfile,
    getUserProfile,
    updateSuccess,
    updateSuccessAck,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else if (!userProfile || userProfile._id !== userId || updateSuccess) {
      getUserProfile(user, userId);
      updateSuccessAck();
    } else {
      setName(userProfile.name);
      setEmail(userProfile.email);
      setIsAdmin(userProfile.isAdmin);
    }
  }, [
    user,
    getUserProfile,
    userProfile,
    history,
    userId,
    updateSuccess,
    updateSuccessAck,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: userProfile._id,
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    if (!password) {
      updateUser(user, userId, updatedUser);
      history.push('/admin/userlist');
    } else {
      if (password === confirmPassword) {
        updateUser(user, userId, updatedUser);
        history.push('/admin/userlist');
      } else {
        setMessage('passwords do not match');
      }
    }
  };

  return (
    <>
      <Header user={user} history={history} />
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FromContainer>
        <h1>Edit User</h1>
        <Form onSubmit={submitHandler}>
          {message && <Message variant="danger">{message}</Message>}
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              // for checkbox it is e.target.checked
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FromContainer>
    </>
  );
};

export default UserEditScreen;
