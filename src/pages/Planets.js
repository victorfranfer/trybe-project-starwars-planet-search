import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../utils/Context';
import Table from '../components/Table';

function Planets() {
  const [filters] = useState(['']);

  const { getPlanets, filterPlanets } = useContext(AppContext);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  useEffect(() => {
    filterPlanets();
  }, [filterPlanets, filters]);

  return (
    <div>
      <Table />
    </div>
  );
}

export default Planets;
