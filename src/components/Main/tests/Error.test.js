import React from 'react';
import Error from '../Error';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

test('should click on button', () => {
  const history = createMemoryHistory();

  render(<Error />, { wrapper: BrowserRouter });
  fireEvent.click(screen.getByText(/Go to Main page/i));

  expect(history.location.pathname).toBe('/');
});
