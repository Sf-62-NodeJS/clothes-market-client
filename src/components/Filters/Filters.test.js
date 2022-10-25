import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filters from './Filters';
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

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

describe('Filters', () => {
  it('should render', () => {
    render(<Filters />, { wrapper: BrowserRouter });
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(screen.getByText(/categories/i)).toBeInTheDocument();
  });
});
