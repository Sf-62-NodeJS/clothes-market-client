import React from 'react';
import Price from '../Price';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const savedLocation = window.location;

describe('Price component test', () => {
  beforeEach(() => {
    render(<Price />, { wrapper: BrowserRouter });
  });

  afterEach(() => {
    window.location = savedLocation;
  });

  it('should interact with empty forms', () => {
    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);

    expect(filter).toBeInTheDocument();
  });

  it('should interact with minPrice', () => {
    const minPrice = screen.getByRole('spinbutton', { name: 'minPrice' });

    fireEvent.change(minPrice, {
      target: { value: '5' }
    });

    expect(minPrice).toHaveValue(5);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);

    fireEvent.change(minPrice, {
      target: { value: '' }
    });
  });

  it('should interact with maxPrice', () => {
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '15' }
    });

    expect(maxPrice).toHaveValue(15);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });

  it('should interact with maxPrice', () => {
    const maxPrice = screen.getByRole('spinbutton', { name: 'maxPrice' });

    fireEvent.change(maxPrice, {
      target: { value: '20' }
    });

    expect(maxPrice).toHaveValue(20);

    const filter = screen.getByTitle('filter');

    fireEvent.click(filter);
  });
});
