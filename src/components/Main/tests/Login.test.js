import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const state = {
  data: [{ _id: 'id', email: 'email@email.com', password: 'password' }],
  loading: true,
  error: null
};

jest.mock('../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

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

    Cookie.get = jest.fn().mockImplementationOnce(() => '0123456789');

    Cookie.remove = jest.fn().mockImplementationOnce(() => true);

    render(<Login />, { wrapper: BrowserRouter });
  });

  it('renders password label text', () => {
    const input = screen.getByLabelText('Password *');
    expect(input).toBeInTheDocument();
  });

  it('inputs email and password', () => {
    const email = screen.getByRole('textbox', 'email');
    const password = screen.getByRole('password', 'password');

    fireEvent.change(email, { target: { value: 'email@email.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/sign in/i));

    expect(email.value).toEqual('email@email.com');
    expect(password.value).toEqual('password');

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('inputs email and password', () => {
    Cookie.get = jest.fn().mockImplementationOnce(() => '123456789');

    expect(sessionStorage.getItem('cookieId')).not.toEqual('123456789');
  });
});
