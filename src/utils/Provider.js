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

  const sortData = (planets) => {
    console.log(planets);
    const ordered = planets.sort((planetA, planetB) => {
      const MAGIC = -1;
      if (planetA.name > planetB.name) return 1;
      return MAGIC;
    });
    return ordered;
  };

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const obj = await response.json();
      const order = sortData(obj.results);
      setData(order);
      setFilteredPlanets(order);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setFilteredPlanets(data);
  }, [data]);

  const sortPlanetsBy = ({ columnName, sort }) => {
    const withoutUnknown = data.filter((planet) => planet[columnName] !== 'unknown');
    const withUnknown = data.filter((planet) => planet[columnName] === 'unknown');
    let sortedPlanets = [];
    if (sort === 'ASC') {
      sortedPlanets = withoutUnknown.sort((planetA, planetB) => (
        planetA[columnName] - planetB[columnName]
      ));
    } else {
      sortedPlanets = withoutUnknown.sort((planetA, planetB) => (
        planetB[columnName] - planetA[columnName]
      ));
    }
    setFilteredPlanets([...sortedPlanets, ...withUnknown]);
  };

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
    sortPlanetsBy,
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
