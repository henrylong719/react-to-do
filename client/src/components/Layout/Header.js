import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Header({ user, history }) {
  const { logout } = useContext(GlobalContext);

  const logoutHandler = () => {
    history.push('/login');
    logout();
  };

  return user !== undefined && user !== null ? (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="/">
        <i className="fas fa-list-ul"></i> TODOLIST
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">PROFILE</Nav.Link>

          {user && user.isAdmin ? (
            <NavDropdown title="ADMIN" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin/todolist">Todos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link onClick={logoutHandler}>LOGOUT</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <a href="/"> {user && user.name} </a>
      </Navbar.Text>
    </Navbar>
  ) : (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <i className="fas fa-list-ul"></i> TODOLIST
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/login">LOGIN</Nav.Link>
          <Nav.Link href="/register">REGISTER</Nav.Link>
          <Nav.Link href="/profile">PROFILE</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
