import React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import axios from 'axios';

// get the userInfo in the localStorage and put it to initialState
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userTodosFromStorage = localStorage.getItem('mytodos')
  ? JSON.parse(localStorage.getItem('mytodos'))
  : null;

// initial state
const initialState = {
  todos: userTodosFromStorage,
  // userInfo: userInfoFromStorage,
  user: userInfoFromStorage,
  userProfile: null,
  allUsers: null,
  allTodos: null,
  listToDoPage: '',
  listToDoPages: '',
  error: '',
};

// create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /********  user operation  **********/

  // user login
  async function login(email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        '/api/v1/users/login',
        { email, password },
        config
      );

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: 'USER_LOGIN_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  // user logout
  function logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('mytodos');

    dispatch({
      type: 'USER_LOGOUT',
    });
  }

  // user register
  async function register(name, email, password) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        '/api/v1/users/register',
        { name, email, password },
        config
      );

      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: 'USER_REGISTER_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  // get user profile
  async function getUserProfile(user, id) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/v1/users/${id}`, config);

      dispatch({
        type: 'GET_USER_PROFILE',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  // update user profile

  async function updateUserProfile(user, updatedUser) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        '/api/v1/users/profile',
        updatedUser,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));

      dispatch({
        type: 'UPDATE_USER_PROFILE',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  /********  todo operation  **********/

  async function getMyTodos(user) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('api/v1/todos/mytodos', config);

      localStorage.setItem('mytodos', JSON.stringify(data.data));

      dispatch({
        type: 'GET_TO_DOS',
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function addTodo(todo, user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post('/api/v1/todos', todo, config);

      // console.log(data);

      await dispatch({ type: 'ADD_TO_DO', payload: data });

      localStorage.setItem(
        'mytodos',
        JSON.stringify([...state.todos, data.data])
      );
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function removeTodo(id, user) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(`/api/v1/todos/${id}`, config);

      localStorage.setItem(
        'mytodos',
        JSON.stringify(
          state.todos.filter((todo) => {
            return todo._id !== id;
          })
        )
      );

      dispatch({ type: 'REMOVE_TO_DO', payload: id });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function removeTodoAck() {
    dispatch({ type: 'REMOVE_TO_DO_ACK' });
  }

  async function markComplete(id, user) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // update  database
      const { data } = await axios.get(`/api/v1/todos/update/${id}`, config);

      console.log(data);

      // update userInterface
      dispatch({ type: 'MARK_COMPLETE', payload: data });

      localStorage.setItem(
        'mytodos',
        JSON.stringify(
          state.todos.map((todo) => {
            if (todo._id === data._id) {
              todo.completed = data.completed;
            }

            return todo;
          })
        )
      );
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  // function successReset() {
  //   dispatch({ type: 'SUCCESS_RESET' });
  // }

  /********** admin operation *****************/

  async function getAllUsers(user) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/v1/users', config);

      // console.log(data);

      dispatch({ type: 'GET_ALL_USERS', payload: data });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function getAllTodos(user, pageNumber = '') {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/todos?pageNumber=${pageNumber}`,
        config
      );

      dispatch({ type: 'GET_ALL_TODOS', payload: data });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function updateUser(user, id, updatedUser) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/users/${id}`,
        updatedUser,
        config
      );

      dispatch({ type: 'UPDATE_USER', payload: data });

      // if the admin update him or herself info, then update the local storage
      if (data._id === user._id) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function deleteUser(user, id) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.delete(`/api/v1/users/${id}`, config);

      dispatch({ type: 'DELETE_USER', payload: data });
    } catch (error) {
      dispatch({
        type: 'TODOS_ERROR',
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
  }

  async function successAck() {
    dispatch({
      type: 'SUCCESS_ACK',
    });
  }

  async function updateSuccessAck() {
    dispatch({
      type: 'UPDATE_SUCCESS_ACK',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        todos: state.todos,
        error: state.error,
        success: state.success,
        userProfile: state.userProfile,
        allUsers: state.allUsers,
        allTodos: state.allTodos,
        listToDoPages: state.listToDoPages,
        listToDoPage: state.listToDoPage,
        updateSuccess: state.updateSuccess,
        addTodo,
        removeTodo,
        markComplete,
        getMyTodos,
        login,
        logout,
        register,
        getUserProfile,
        updateUserProfile,
        getAllUsers,
        getAllTodos,
        // successReset,
        removeTodoAck,
        successAck,
        updateUser,
        deleteUser,
        updateSuccessAck,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
