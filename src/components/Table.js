import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function Table() {
  const { planets } = useContext(AppContext);

  const tableHead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Create', 'Edited', 'Url'];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHead.map((element, index) => (
              <th key={ index }><b>{ element }</b></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet, index) => (
              <tr key={ index }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
