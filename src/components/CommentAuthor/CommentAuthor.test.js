import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentAuthor from './CommentAuthor';
import { BrowserRouter } from 'react-router-dom';

const state = {
  data: { _id: 'id', name: 'name', surname: 'surname' },
  loading: true,
  error: null
};

jest.mock('../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('CommentAuthor', () => {
  it('should render', () => {
    render(<CommentAuthor />, { wrapper: BrowserRouter });

    expect(screen.getByText(/name surname/i)).toBeInTheDocument();

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<CommentAuthor />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();
  });
});
