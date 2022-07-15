import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa a aplicação', () => {
  it('Table:', async () => {
    await render(<App />);
    const columnsElements = await screen.findAllByRole('columnheader');
    const tableInfoElement = await screen.findAllByRole('cell', undefined, { timeout: 2000});
    expect(columnsElements).toHaveLength(13);
    expect(tableInfoElement).toHaveLength(130);
  });

  // it('Filters', async () => {
  //   const searchPlanets = ({ target }) => {
  //     const array = data.filter((element) => element.name.includes(target.value));
  //     setFilteredPlanets(array);
  //   };
  //   const planetsList = [ { name: `aaa`, population: '1000'}, { name: `aaa`, population: '100'}]
  //   const filter = searchPlanets(planetsList, "a");
  //   expect(filter).toBeTruthy();
  
  //   const filter2 = filteredDataByNumber(planetsList, [{ column: 'population', comparison: 'maior que', value: 100 }]);
  //   expect(filter2).toBeTruthy();
  
  //   const filter3 = filteredDataByNumber(planetsList, [{ column: 'population', comparison: 'menor que', value: 10000 }]);
  //   expect(filter3).toBeTruthy();
  
  //   const filter4 = filteredDataByNumber(planetsList, [{ column: 'population', comparison: 'igual a', value: 0 }]);
  //   expect(filter4).toBeTruthy();
  
  //   const filter5 = filteredDataByNumber(planetsList, [{ column: '', comparison: '', value: 0 }]);
  //   expect(filter5).toBeTruthy();
  
  //   filteredDataByOrder(planetsList, { column: 'population', sort: 'ASC'});
  //   filteredDataByOrder(planetsList, { column: 'population', sort: 'DESC'});
  //   filteredDataByOrder(planetsList, { column: 'population', sort: ''});
  
  // });
});