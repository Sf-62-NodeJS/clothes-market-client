import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Header component test', () => {
  it('renders login element', () => {
    render(<Header />, { wrapper: Router });
    const loginElement = screen.getByText(/login/i);
    expect(loginElement).toBeInTheDocument();
  });

  it('clicks on Home NavLink', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const { getByText } = render(
            <Router history={history}>
                <Header />
            </Router>
    );
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText(/home/i));
    expect(history.location.pathname).toBe('/');
  });
});
