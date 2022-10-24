import React from 'react';
import Categories from './Categories';
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

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const state = {
  data: [{ _id: 'id', name: 'name' }],
  loading: true,
  error: null
};

jest.mock('../../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

describe('Categories component test', () => {
  beforeEach(() => {
    render(<Categories />, { wrapper: BrowserRouter });
  });

  it('should render categories component', () => {
    const category = screen.getByText(/name/i);
    expect(category).toBeInTheDocument();

    state.error = {};
  });

  it('should render error in categories component', () => {
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
    state.loading = false;
  });

  it('should click on category in categories component', () => {
    mockUseLocationValue.search = '';
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });

  it('should click on category in categories component', () => {
    mockUseLocationValue.search = '?category=some';
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });

  it('should click on category in categories component', () => {
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });
});
