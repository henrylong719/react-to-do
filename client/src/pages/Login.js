import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Header from '../components/Layout/Header';

const Login = ({ history }) => {
  const { user, login, error } = useContext(GlobalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Header />
      <h1 className="text-center mt-5">To do List</h1>
      <Form style={formStyle} className="mx-auto " onSubmit={onSubmit}>
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <br />
        <br />
        New Customer?
        <Link to={'/register'}> Register</Link>
      </Form>
    </>
  );
};

const formStyle = {
  width: '30rem',
  marginTop: '5rem',
};

export default Login;
