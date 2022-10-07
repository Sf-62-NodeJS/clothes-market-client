import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Cookie from 'js-cookie';

describe('Header component test', () => {
  const sessionStorageMock = (function () {
    const store = { cookieId: '123456789' };

    return {
      getItem (key) {
        return store[key];
      },

      removeItem (key) {
        store.cookieId = null;
        return store[key];
      }
    };
  })();

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  });

  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '123456789');

    Cookie.remove = jest.fn().mockImplementation(() => true);
  });

  it('renders profile element', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const profileElement = screen.getByText(/profile/i);
    expect(profileElement).toBeInTheDocument();
  });

  it('clicks on Home NavLink', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getByText } = render(
            <BrowserRouter history={history}>
                <Header />
            </BrowserRouter>
    );
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText(/home/i));
    expect(history.location.pathname).toBe('/');
  });

  it('clicks on logout', () => {
    const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
    );
    fireEvent.click(getByText(/logout/i));
    expect(Cookie.remove).toBeCalled();
  });

  it('renders login element', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });
});
