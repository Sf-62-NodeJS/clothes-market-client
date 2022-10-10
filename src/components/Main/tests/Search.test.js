import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Search from '../Search';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();
const state = {
  data: [{ _id: 'id', name: 'name' }],
  loading: true,
  error: null
};

jest.mock('../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Search component tests', () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'myCookie=123456789'
  });

  beforeEach(() => {
    render(<Search />, { wrapper: BrowserRouter });
  });

  it('should write in search bar and click on search button', async () => {
    const searchBar = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(searchBar.value).toEqual('test');

    fireEvent.click(button);
    expect(searchBar.value).toEqual('');
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);

    state.data = null;
    state.error = {};
  });

  it('should call navigate when error', () => {
    const searchBar = screen.getByRole('textbox');
    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(mockedUsedNavigate).toHaveBeenCalled();

    state.error = null;
    state.loading = true;
  });

  it('should show loading on screen', () => {
    const searchBar = screen.getByRole('textbox');
    fireEvent.change(searchBar, { target: { value: 'test' } });

    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });
});
