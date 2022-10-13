import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const state = {
  data: [{ _id: 'id', email: 'email@email.com', password: 'password' }],
  loading: true,
  error: null
};
const mockedUsedNavigate = jest.fn();

jest.mock('../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Login component test', () => {
  beforeEach(() => {
    Cookie.get = jest.fn().mockImplementationOnce(() => '');

    render(<Login />, { wrapper: BrowserRouter });
  });

  it('renders password label text', () => {
    const input = screen.getByLabelText('Password *');
    expect(input).toBeInTheDocument();
  });

  it('redirects to home(/) when isCookie', () => {
    Cookie.get = jest.fn().mockImplementationOnce(() => '123456879');
  });

  it('inputs email and password', () => {
    const email = screen.getByRole('textbox', 'email');
    const password = screen.getByRole('password', 'password');

    fireEvent.change(email, { target: { value: 'email@email.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/sign in/i));

    expect(email.value).toEqual('email@email.com');
    expect(password.value).toEqual('password');

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('triggers useNavigate on error', () => {
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
    state.loading = false;
    state.data = {};
  });

  it('triggers useNavigate on cookie', () => {
    Cookie.get = jest.fn().mockImplementationOnce(() => '123456789');
    render(<Login />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();
  });
});
