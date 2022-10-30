import React from 'react';
import { render, screen } from '@testing-library/react';
import SingleCategory from './SingleCategory';
import { BrowserRouter } from 'react-router-dom';

const state = {
  data: [{ _id: 'id', name: 'name' }],
  loading: true,
  error: null
};

jest.mock('../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('SingleCategory', () => {
  it('should render', () => {
    render(<SingleCategory />, { wrapper: BrowserRouter });

    expect(screen.getByText(/name/i)).toBeInTheDocument();

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<SingleCategory />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();
  });
});
