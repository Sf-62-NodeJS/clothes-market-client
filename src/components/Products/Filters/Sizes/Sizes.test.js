import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import Sizes from './Sizes';
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

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Sizes', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(<Sizes />, { wrapper: BrowserRouter });
  });

  it('should render', () => {
    const boxS = screen.getByRole('checkbox', { name: 'S' });
    const boxM = screen.getByRole('checkbox', { name: 'M' });

    fireEvent.click(boxS);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.click(boxM);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.click(boxS);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    fireEvent.click(boxM);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    state.error = {};
  });

  it('should redirect to error component', () => {
    state.error = {};
    state.data = null;
    state.loading = false;

    expect(mockedUsedNavigate).toBeCalled();
  });
});
