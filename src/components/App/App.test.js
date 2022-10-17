import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: ''
});

test('renders app component', () => {
  render(<App />);
  const shop = screen.getByText(/shop/i);
  expect(shop).toBeInTheDocument();
});
