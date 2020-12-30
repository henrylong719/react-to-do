import React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
  todos: [],
};

// create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTodos() {
    try {
      const res = await axios.get('api/v1/todos/');

      dispatch({
        type: 'GET_TO_DOS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addTodo(todo) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/todos', todo, config);

      dispatch({ type: 'ADD_TO_DO', payload: res.data.data });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function removeTodo(id) {
    try {
      await axios.delete(`/api/v1/todos/${id}`);
      dispatch({ type: 'REMOVE_TO_DO', payload: id });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function markComplete(id) {
    try {
      // update  database
      const { data } = await axios.put(`/api/v1/todos/${id}`);

      // update userInterface
      dispatch({ type: 'MARK_COMPLETE', payload: data._id });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        markComplete,
        getTodos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
