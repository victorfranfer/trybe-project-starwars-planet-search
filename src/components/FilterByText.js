import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function FilterByText() {
  const { filterByName, setFilterByName } = useContext(AppContext);
  return (
    <label htmlFor="filter">
      Search:
      <input
        type="text"
        id="filter"
        data-testid="name-filter"
        value={ filterByName.name }
        onChange={ (e) => setFilterByName({ name: e.target.value }) }
      />
    </label>
  );
}

export default FilterByText;
