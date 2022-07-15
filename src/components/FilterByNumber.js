import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../utils/AppContext';

function FilterByNumber() {
  const {
    data,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    setFilteredPlanets,
    column,
    setColumn,
  } = useContext(AppContext);
  console.log(column);

  const [filters, setFilters] = useState(false);
  const [arrays, setArrays] = useState([]);

  const handleClick = () => {
    const filter = data.filter((planet) => arrays.every((element) => {
      if (element.comparison === 'maior que') {
        return Number(planet[element.column]) > Number(element.val);
      }
      if (element.comparison === 'menor que') {
        return Number(planet[element.column]) < Number(element.val);
      }
      if (element.comparison === 'igual a') {
        return Number(planet[element.column]) === Number(element.val);
      }
      return false;
    }));
    setFilteredPlanets(filter);
  };

  useEffect(() => {
    handleClick();
  }, [arrays]);

  const handleClickDelete = (columnDelete) => {
    setArrays(
      (prevState) => prevState.filter((element) => element.column !== columnDelete),
    );
    setColumn([...column, columnDelete]);
  };

  const handleDeleteAll = () => {
    const columnsArray = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setArrays([]);
    setColumn([...columnsArray]);
    setFilteredPlanets(data);
  };

  const handleClickFilter = () => {
    setArrays((prevState) => [
      ...prevState,
      { column: columnFilter, comparison: comparisonFilter, val: valueFilter },
    ]);
    const newColumn = column.filter((option) => option !== columnFilter);
    setColumn(newColumn);
    setFilters(true);
    setColumnFilter(newColumn[0]);
    setComparisonFilter('maior que');
    setValueFilter(0);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ (e) => setColumnFilter(e.target.value) }
      >
        { column.map((element) => (
          <option value={ element } key={ element }>{element}</option>
        )) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparisonFilter(e.target.value) }
        value={ comparisonFilter }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filter
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remove Filters
      </button>
      {filters && (
        <div>
          {arrays.map((element, i) => (
            <div data-testid="filter" key={ i }>
              <span>{element.column}</span>
              <span>{element.comparison}</span>
              <span>{element.val}</span>
              <button
                onClick={ () => handleClickDelete(element.column) }
                type="button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterByNumber;
