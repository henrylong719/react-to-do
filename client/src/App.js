import React from 'react';
import './App.css';
import TodoScreen from './pages/TodoScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { GlobalProvider } from './context/GlobalState';
import Profile from './pages/Profile';
import UserListScreen from './pages/UserListScreen';
import TodoListScreen from './pages/TodoListScreen';
import UserEditScreen from './pages/UserEditScreen';

const App = () => {
  return (
    <Router>
      <GlobalProvider>
        <main>
          <div className="App">
            <div>
              <Route exact path="/" component={TodoScreen}></Route>
            </div>
          </div>
          <Route path="/profile" exact component={Profile}></Route>

          <Route path="/login" exact component={Login}></Route>

          <Route path="/register" exact component={Register}></Route>
          <Route
            path="/admin/userlist"
            exact
            component={UserListScreen}
          ></Route>

          <Route
            path="/admin/todolist"
            exact
            component={TodoListScreen}
          ></Route>

          <Route
            path="/admin/todolist/:pageNumber"
            exact
            component={TodoListScreen}
          ></Route>

          <Route path="/admin/user/:id/edit" component={UserEditScreen}></Route>
        </main>
      </GlobalProvider>
    </Router>
  );
};

export default App;
