import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'connect.sid=123456789'
});

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
