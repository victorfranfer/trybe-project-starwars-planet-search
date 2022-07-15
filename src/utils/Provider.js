import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const columnsArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [column, setColumn] = useState([...columnsArray]);
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterByNumericValue, setFilterByNumericValue] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const obj = await response.json();
      setData(obj.results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setFilteredPlanets(data);
  }, [data]);

  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filterByNumericValue,
    setFilterByNumericValue,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filteredPlanets,
    setFilteredPlanets,
    column,
    setColumn,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
