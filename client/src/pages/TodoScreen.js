import React, { useEffect, useContext } from 'react';
import { AddTodo } from '../components/AddTodo';
import { Todos } from '../components/Todos';
import { GlobalContext } from '../context/GlobalState';
import Header from '../components/Layout/Header';

const TodoScreen = ({ history }) => {
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  return (
    <>
      <Header user={user} history={history} />
      <AddTodo />
      <Todos />
    </>
  );
};

export default TodoScreen;
