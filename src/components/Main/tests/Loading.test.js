import React from 'react';
import Loading from '../Loading';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('should click on button', () => {
  render(<Loading />, { wrapper: BrowserRouter });

  const loader = screen.getByRole('loading');

  expect(loader).toBeInTheDocument();
});
