import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import AppContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const obj = await response.json();
      setPlanets(obj.results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    setPlanets(data);
  }, [data]);

  const contextValue = {
    data,
    setData,
    planets,
    setPlanets,
    filterPlanets,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
