import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function Table() {
  const { data, filterByName } = useContext(AppContext);

  const tableHead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Create', 'Edited', 'Url'];

  const filterPlanets = () => data.filter((planet) => planet
    .name.includes(filterByName.name));

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
          {data.length && filterPlanets().map((planet) => (
            <tr key={ planet.name }>
              { Object.values(planet)
                .map((value) => <td key={ value }>{value}</td>)}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
