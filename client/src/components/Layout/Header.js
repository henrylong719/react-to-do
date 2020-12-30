import React from 'react';

export default function Header() {
  return (
    <header style={headerStyle}>
      <h3>TodoList</h3>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: ' 10px',
};
