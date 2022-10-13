import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../Products';
import { BrowserRouter } from 'react-router-dom';

const state = {
  data: [{ _id: 'id', name: 'name' }],
  loading: true,
  error: null
};

jest.mock('../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

describe('Products', () => {
  it('should render', () => {
    render(<Products />, { wrapper: BrowserRouter });

    expect(screen.getByText(/categories/i)).toBeInTheDocument();

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render', () => {
    render(<Products />, { wrapper: BrowserRouter });

    expect(
      screen.getByRole('listitem', { name: 'error' })
    ).toBeInTheDocument();

    state.error = {};
  });
});
