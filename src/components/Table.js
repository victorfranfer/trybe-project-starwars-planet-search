import React, { useContext, useState } from 'react';
import AppContext from '../utils/AppContext';

function Table() {
  const { filteredPlanets, sortPlanetsBy } = useContext(AppContext);

  const tableHead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Create', 'Edited', 'Url'];

  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleColumn = ({ target }) => {
    const { value } = target;
    setOrder((prev) => ({
      ...prev,
      column: value,
    }));
  };

  const handleSort = ({ target }) => {
    const { value } = target;
    setOrder((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  const sortTable = () => {
    sortPlanetsBy(order);
    setOrder({
      column: 'population',
      sort: 'ASC',
    });
  };

  return (
    <div>
      <div>
        <div>
          <select data-testid="column-sort" onChange={ handleColumn }>
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </div>
        <div>
          <label htmlFor="asc">
            Ascendente
            <input
              type="radio"
              name="order"
              id="asc"
              data-testid="column-sort-input-asc"
              value="ASC"
              onClick={ handleSort }
            />
          </label>
          <label htmlFor="desc">
            Descendente
            <input
              type="radio"
              name="order"
              id="desc"
              data-testid="column-sort-input-desc"
              value="DESC"
              onClick={ handleSort }
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ sortTable }
          >
            Ordena
          </button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            {tableHead.map((element, index) => (
              <th key={ index }><b>{ element }</b></th>
            ))}
          </tr>
          {filteredPlanets.map((element, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{ element.name || 'Alderaan' }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td><a href={ element.films }>{ element.films }</a></td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td><a href={ element.url }>{ element.url }</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
