import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import response from './mock';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(response)
    }));
  })

  afterEach(() => jest.clearAllMocks());

  it('Testa se os elementos são renderizados na tela', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: /starwars/i, level: 2})
    const inputSearchByName = screen.getByTestId("name-filter");
    const inputColumn = screen.getByTestId("column-filter");
    const inputComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(inputSearchByName).toBeInTheDocument();
    expect(inputColumn).toBeInTheDocument();
    expect(inputComparison).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    expect(inputSearchByName).toHaveValue('');
    expect(inputColumn).toHaveValue('population');
    expect(inputComparison).toHaveValue('maior que');
    expect(inputValue).toHaveValue(0);
  })

  it('Testa se é feita uma requisição a API de planetas e se a tabela é renderizada', async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');

    const table = screen.getAllByRole('columnheader');

    expect(table).toHaveLength(13);
  })

  it('Testa o funcionamento do filtro de nome', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const inputSearchByName = screen.getByTestId("name-filter");

    userEvent.type(inputSearchByName, 'Tato');

    expect(screen.getAllByTestId('name-planet')).toHaveLength(1);
  })

  it('Testa o funcionamento dos filtros de valor', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const inputColumn = screen.getByTestId("column-filter");
    const inputComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.type(inputValue, '200000');
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(6);

    userEvent.selectOptions(inputColumn, 'rotation_period');
    userEvent.selectOptions(inputComparison, 'menor que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '26')
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(4);

    userEvent.selectOptions(inputColumn, 'surface_water');
    userEvent.selectOptions(inputComparison, 'igual a');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '40')
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(1);

    userEvent.selectOptions(inputColumn, 'surface_water');
    userEvent.selectOptions(inputComparison, 'menor que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '2');
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(2);
  })

  it('Testes filtros', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });
    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);
    expect(await screen.findAllByRole('row')).toHaveLength(3)
    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'rotation_period'}))
    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))
    userEvent.type(value, '20')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 020/i)
    expect( screen.queryAllByRole('row')).toHaveLength(3)
  });

  it('Testa o número de opções de column se um filtro é escolhido e sua remoção', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const inputColumn = screen.getByTestId("column-filter");
    const inputComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.type(inputValue, '200000');
    userEvent.click(buttonFilter);

    const filter = screen.getByTestId("filter");
    const removeFilter = screen.getByTestId("remove-filter");
    const buttonRemoveFilters = screen.getByTestId("button-remove-filters");

    expect(inputColumn).toHaveLength(4);
    expect(filter).toBeInTheDocument();
    expect(removeFilter).toBeInTheDocument();
    expect(buttonRemoveFilters).toBeInTheDocument();

    userEvent.selectOptions(inputColumn, 'surface_water');
    userEvent.selectOptions(inputComparison, 'menor que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '13')
    userEvent.click(buttonFilter);

    expect(inputColumn).toHaveLength(3);
    expect(screen.getAllByTestId('name-planet')).toHaveLength(3);

    userEvent.click(removeFilter);

    expect(inputColumn).toHaveLength(4);
    expect(screen.getAllByTestId('name-planet')).toHaveLength(6);

    userEvent.click(buttonRemoveFilters);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(10);
    expect(inputColumn).toHaveLength(5);
    expect(filter).not.toBeInTheDocument();
    expect(removeFilter).not.toBeInTheDocument();
    expect(buttonRemoveFilters).not.toBeInTheDocument();
    expect(screen.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
  })

  test('Testes igual a', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    fireEvent.change(screen.getByTestId('column-filter'), {target: { value: "rotation_period"} });
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });
    userEvent.type(value, '12')
    userEvent.click(btnFilter);
    expect(screen.getByText(/bespin/i)).toBeInTheDocument();
  });

  // it('Testes de filtragem por nome do componente Filter', async () => {
  //   render(<App />)

  //   let planet = screen.queryAllByTestId(/planet-name/i);
  //   expect(planet.length).toBe(10);

  //   const nameFilter = screen.getByTestId('name-filter');
  //   expect(nameFilter).toBeInTheDocument();
  //   userEvent.type(nameFilter, 'o');

  //   planet = screen.queryAllByTestId(/planet-name/i);
  //   expect(planet.length).toBe(7);

  //   userEvent.type(nameFilter, 'o');

  //   planet = screen.queryAllByTestId(/planet-name/i);
  //   expect(planet.length).toBe(2);
  // })

  // it('Testes do componente Table', async () => {
  //   render(<App />)

  //   let planetsName = screen.queryAllByTestId(/planet-name/i);
  //   expect(planetsName[0]).toHaveTextContent('Alderaan');

  //   const btn = screen.getByTestId(/column-sort-button/i);
  //   expect(btn).toBeInTheDocument();

  //   const columnSelect = screen.getByTestId('column-sort');
  //   await userEvent.selectOptions(columnSelect, 'diameter');
  //   expect(columnSelect.value).toBe('diameter');

  //   const radioDesc = screen.getByTestId(/column-sort-input-desc/i);
  //   userEvent.click(radioDesc);
  //   expect(radioDesc.checked).toEqual(true);

  //   userEvent.click(btn);

  //   expect(planetsName[0]).toHaveTextContent('Bespin');

  //   await userEvent.selectOptions(columnSelect, 'rotation_period');

  //   const radioAsc = screen.getByTestId(/column-sort-input-asc/i);
  //   userEvent.click(radioAsc);
  //   expect(radioAsc.checked).toEqual(true);

  //   userEvent.click(btn);

  //   planetsName = screen.queryAllByTestId(/planet-name/i);
  //   expect(planetsName[0]).toHaveTextContent('Bespin');
  // })

});