import React from 'react';
import { screen, render } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'myCookie=omnomnom'
});

describe('Login component test', () => {
  it('renders login button', () => {
    render(<Login />, { wrapper: BrowserRouter });
    const input = screen.getByLabelText('Password *');
    expect(input).toBeInTheDocument();
  });
});
