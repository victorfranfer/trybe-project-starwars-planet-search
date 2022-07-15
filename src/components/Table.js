import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

function Table() {
  const { filteredPlanets, data } = useContext(AppContext);

  console.log(data);
  console.log(filteredPlanets);

  const tableHead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Create', 'Edited', 'Url'];

  // const columnsArray = ['population', 'orbital_period',
  //   'diameter', 'rotation_period', 'surface_water'];

  // const filterPlanets = () => data.filter((planet) => planet
  //   .name.includes(filterByName.name));

  // const filterPlanets = () => data.filter((planet) => {
  //   console.log(data);
  //   console.log(filterByName);
  //   console.log(filterByNumericValue);
  //   if (filterByName !== '') {
  //     return planet.name.includes(filterByName.name);
  //   }
  //   for (i === 0; i < columnsArray.length; i += 1) {
  //     if (filterByNumericValue.column === columnsArray[i]) {
  //       return planet.column.includes(filterByNumericValue.column);
  //     }
  //   }
  //   return null;
  // });

  return (
    <table>
      <tbody>
        <tr>
          {tableHead.map((element, index) => (
            <th key={ index }><b>{ element }</b></th>
          ))}
        </tr>
        {filteredPlanets.map((element, index) => (
          <tr key={ index }>
            <td>{ element.name }</td>
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
  );
}

export default Table;
