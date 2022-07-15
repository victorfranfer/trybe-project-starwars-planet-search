import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function FilterByText() {
  const { data, setFilteredPlanets } = useContext(AppContext);

  const searchPlanets = ({ target }) => {
    const array = data.filter((element) => element.name.includes(target.value));
    setFilteredPlanets(array);
  };

  return (
    <label htmlFor="filter">
      Search:
      <input
        type="text"
        id="filter"
        data-testid="name-filter"
        onChange={ searchPlanets }
      />
    </label>
  );
}

export default FilterByText;
