import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Login component test', () => {
  const sessionStorageMock = (function () {
    const store = { cookieId: '123456789' };

    return {
      getItem (key) {
        return store[key];
      },

      setItem (key) {
        store.cookieId = '0123456789';
        return true;
      }
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=0123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '0123456789');

    Cookie.remove = jest.fn().mockImplementation(() => true);
  });

  it('renders password label text', () => {
    render(<Login />, { wrapper: BrowserRouter });
    const input = screen.getByLabelText('Password *');
    expect(input).toBeInTheDocument();
  });

  it('inputs email and password', () => {
    render(<Login />, { wrapper: BrowserRouter });
    const email = screen.getByRole('textbox', 'email');
    const password = screen.getByRole('password', 'password');

    fireEvent.change(email, { target: { value: 'email@email.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/sign in/i));

    expect(email.value).toEqual('email@email.com');
    expect(password.value).toEqual('password');
  });
});
