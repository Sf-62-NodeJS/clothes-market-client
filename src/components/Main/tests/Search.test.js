import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Search from '../Search';
import { BrowserRouter } from 'react-router-dom';

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
});
