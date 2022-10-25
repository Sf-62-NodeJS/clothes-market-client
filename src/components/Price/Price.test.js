import React from 'react';
import Price from './Price';
import { screen, render, fireEvent, act } from '@testing-library/react';
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
    jest.useFakeTimers();
    render(<Price />, { wrapper: BrowserRouter });
  });

  it('should interact with minPrice', () => {
    mockUseLocationValue.search = '';
    const minPrice = screen.getByRole('spinbutton', { name: 'minPrice' });

    fireEvent.change(minPrice, {
      target: { value: '5' }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(minPrice).toHaveValue(5);
  });

  it('should interact with minPrice', () => {
    mockUseLocationValue.search = '?smt=smt';
    const minPrice = screen.getByRole('spinbutton', { name: 'minPrice' });

    fireEvent.change(minPrice, {
      target: { value: '5' }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(minPrice).toHaveValue(5);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(minPrice).toHaveValue(null);
  });

  it('should interact with maxPrice', () => {
    mockUseLocationValue.search = '?minPrice=2';
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '15' }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(maxPrice).toHaveValue(15);
  });

  it('should interact with maxPrice', () => {
    mockUseLocationValue.search = '?maxPrice=3';
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '20' }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(maxPrice).toHaveValue(20);
  });
});
