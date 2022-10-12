import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filters from '../Filters';
import { BrowserRouter } from 'react-router-dom';

describe('Filters', () => {
  it('should render the filters', () => {
    const { getByText } = render(<Filters />, { wrapper: BrowserRouter });
    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('Price')).toBeInTheDocument();
    expect(getByText('Sizes')).toBeInTheDocument();
  });
});
