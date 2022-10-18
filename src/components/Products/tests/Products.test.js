import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../Products';
import { BrowserRouter } from 'react-router-dom';

describe('Products', () => {
  it('should render', () => {
    render(<Products />, { wrapper: BrowserRouter });

    expect(screen.getByText(/categories/i)).toBeInTheDocument();
  });
});
