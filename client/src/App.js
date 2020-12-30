import React from 'react';
import './App.css';
import { Todos } from './components/Todos';
import { AddTodo } from './components/AddTodo';
import Header from './components/Layout/Header';

import { GlobalProvider } from './context/GlobalState';

class App extends React.Component {
  render() {
    return (
      <GlobalProvider>
        <div className="App">
          <div className="container">
            <div>
              <Header />
              <AddTodo />
              <Todos />
            </div>
          </div>
        </div>
      </GlobalProvider>
    );
  }
}

export default App;
