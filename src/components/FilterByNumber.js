import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function FilterByNumber() {
  const {
    filterByNumericValue,
    setFilterByNumericValue,
  } = useContext(AppContext);
  const { column, comparison, value } = filterByNumericValue;

  const handleClick = (data) => {
    const filter = data.filter((planet) => {
      if (comparison === 'maior que') {
        return parseInt(planet[column], 10)
            > parseInt(value, 10);
      }
      if (comparison === 'menor que') {
        return parseInt(planet[column], 10)
            < parseInt(value, 10);
      }
      return parseInt(planet[column], 10) === parseInt(value, 10);
    });
    console.log(filter);
    return filter;
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ (e) => setFilterByNumericValue([...filterByNumericValue,
          { column: e.target.value }]) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setFilterByNumericValue([...filterByNumericValue,
          { ...filterByNumericValue, comparison: e.target.value }]) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => setFilterByNumericValue([...filterByNumericValue,
          { value: e.target.value }]) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
    </div>
  );
}

export default FilterByNumber;
