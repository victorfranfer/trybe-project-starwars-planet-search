import React from 'react';
import Table from './components/Table';
import FilterByText from './components/FilterByText';
import Provider from './utils/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <h2>StarWars</h2>
      <FilterByText />
      <Table />
    </Provider>
  );
}

export default App;
