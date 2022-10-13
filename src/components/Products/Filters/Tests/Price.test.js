import React from 'react';
import Price from '../Price';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockUseLocationValue = {
  pathname: 'localhost:3000/example',
  search: '?something',
  hash: '',
  state: null
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocationValue
}));

describe('Price component test', () => {
  beforeEach(() => {
    render(<Price />, { wrapper: BrowserRouter });
  });

  it('should interact with empty forms', () => {
    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);

    expect(filter).toBeInTheDocument();
  });

  it('should interact with minPrice', () => {
    mockUseLocationValue.search = '';
    const minPrice = screen.getByRole('spinbutton', { name: 'minPrice' });

    fireEvent.change(minPrice, {
      target: { value: '5' }
    });

    expect(minPrice).toHaveValue(5);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });

  it('should interact with minPrice', () => {
    mockUseLocationValue.search = '?smt=smt';
    const minPrice = screen.getByRole('spinbutton', { name: 'minPrice' });

    fireEvent.change(minPrice, {
      target: { value: '5' }
    });

    expect(minPrice).toHaveValue(5);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });

  it('should interact with maxPrice', () => {
    mockUseLocationValue.search = '?minPrice=2';
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '15' }
    });

    expect(maxPrice).toHaveValue(15);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });

  it('should interact with maxPrice', () => {
    mockUseLocationValue.search = '?maxPrice=3';
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '20' }
    });

    expect(maxPrice).toHaveValue(20);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });
});
