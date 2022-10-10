import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Search from '../Search';
import { BrowserRouter } from 'react-router-dom';
import useHttpRequest from '../../../hooks/useHttpRequest';

jest.mock('../../../hooks/useHttpRequest', () => ({
  ...jest.requireActual('../../../hooks/useHttpRequest'),
  __esModule: true,
  default: jest.fn()
}));

const mockedUsedNavigate = jest.fn();

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
  });

  it('should call navigate when error', () => {
    const searchBar = screen.getByRole('textbox');
    fireEvent.change(searchBar, { target: { value: 'test' } });

    useHttpRequest.mockImplementationOnce(() => ({
      fetchRequest: jest.fn(),
      state: { data: null, loading: false, error: {} }
    }));

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  it('should show loading on screen', () => {
    const searchBar = screen.getByRole('textbox');
    fireEvent.change(searchBar, { target: { value: 'test' } });

    useHttpRequest.mockImplementationOnce(() => ({
      fetchRequest: jest.fn(),
      state: { data: null, loading: true, error: null }
    }));

    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });
});
