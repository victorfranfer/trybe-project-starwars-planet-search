import React from 'react';
import Table from './components/Table';
import FilterByText from './components/FilterByText';
import FilterByNumber from './components/FilterByNumber';
import Provider from './utils/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <header className="App-header">
        <h2>StarWars</h2>
      </header>
      <FilterByText />
      <FilterByNumber />
      <Table />
    </Provider>
  );
}

export default App;
