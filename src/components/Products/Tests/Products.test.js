import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../Products';
import { BrowserRouter } from 'react-router-dom';

describe('Products', () => {
  beforeEach(() => {
    render(<Products />, { wrapper: BrowserRouter });
  });
  it('should render the products', async () => {
    const category = screen.getByText(/categories/i);
    expect(category).toBeInTheDocument();
  });
});
