import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Sizes from '../Sizes';
import { BrowserRouter } from 'react-router-dom';

const mockUseLocationValue = {
  pathname: 'localhost:3000/example',
  search: '',
  hash: '',
  state: null
};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockUseLocationValue
}));

const state = {
  data: [
    {
      _id: 'Se9d8d8d8d8d8d8d8d8d8d8d',
      name: 'S'
    },
    {
      _id: 'Me9d8d8d8d8d8d8d8d8d8d8d',
      name: 'M'
    },
    {
      _id: 'Le9d8d8d8d8d8d8d8d8d8d8d',
      name: 'L'
    }
  ],
  loading: true,
  error: null
};

jest.mock('../../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Sizes', () => {
  beforeEach(() => {
    render(<Sizes />, { wrapper: BrowserRouter });
  });

  it('should render', () => {
    const boxS = screen.getByRole('checkbox', { name: 'S' });
    const boxM = screen.getByRole('checkbox', { name: 'M' });

    fireEvent.click(boxS);
    fireEvent.click(boxM);
    fireEvent.click(boxS);
  });
});
