import React from 'react';
import Table from './components/Table';
import Provider from './utils/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <span>Hello</span>
      <Table />
    </Provider>
  );
}

export default App;
