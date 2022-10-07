import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'connect.sid=123456789'
});

describe('Header component test', () => {
  it('renders login element', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
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
});
