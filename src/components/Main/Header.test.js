import React from 'react';
import { screen, render } from '@testing-library/react';
import Header from './Header';

test('renders login element', () => {
  render(<Header />);
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});
