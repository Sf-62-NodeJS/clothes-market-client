import React from 'react';
import Categories from '../Categories';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const savedLocation = window.location;

const state = {
  data: [{ _id: 'id', name: 'name' }],
  loading: true,
  error: null
};

jest.mock('../../../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

describe('Categories component test', () => {
  beforeEach(() => {
    render(<Categories />, { wrapper: BrowserRouter });
  });

  afterEach(() => {
    window.location = savedLocation;
  });

  it('should render categories component', () => {
    const category = screen.getByText(/name/i);
    expect(category).toBeInTheDocument();

    state.error = {};
  });

  it('should render error in categories component', () => {
    const category = screen.getByText(/error/i);
    expect(category).toBeInTheDocument();

    state.error = null;
    state.loading = false;
  });

  it('should click on category in categories component', () => {
    delete window.location;
    window.location = { href: 'http://site.com/page?test=test' };
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });

  it('should click on category in categories component', () => {
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });

  it('should click on category in categories component', () => {
    const category = screen.getByText(/name/i);

    fireEvent.click(category);
    expect(category).toBeInTheDocument();
  });
});
