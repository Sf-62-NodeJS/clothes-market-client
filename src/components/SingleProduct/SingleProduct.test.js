import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SingleProduct from './SingleProduct';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const state = {
  data: [
    {
      _id: '634ff6c2bfa3d2a0d3df6153',
      name: 'adidas Men\'s Ent22 Tee T-Shirt',
      description:
                'Material Composition - 100% Cotton\nCare Instructions - Machine Wash\nClosure Type - Pull On\nSleeve Type - Short Sleeve',
      image: '160bf8f8-354b-4313-935e-43fb752b3ffa.jpg',
      category: '6314ba4c241f0cfda09d5998',
      sizes: ['632210f594fef5be87446bab', '632dc4d19c783b85ced93987'],
      status: '63173c701e074f1cf65f3c01',
      comments: [],
      price: 17.26,
      __v: 0
    }
  ],
  loading: true,
  error: null
};

jest.mock('../../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '634ff6c2bfa3d2a0d3df6153'
  })
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('SingleProduct', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '123456789');
  });

  it('should render the SingleProduct component', () => {
    const { getByText } = render(<SingleProduct />, {
      wrapper: BrowserRouter
    });
    expect(getByText('Add To Cart')).toBeInTheDocument();
  });

  it('should increase the quantity', () => {
    const { getByText } = render(<SingleProduct />, {
      wrapper: BrowserRouter
    });
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('-'));
    expect(getByText('2')).toBeInTheDocument();
  });

  it('should decrease the quantity', () => {
    const { getByText } = render(<SingleProduct />, {
      wrapper: BrowserRouter
    });
    fireEvent.click(getByText('-'));
    expect(getByText('1')).toBeInTheDocument();

    state.error = {};
  });

  it('should navigate to error component', () => {
    render(<SingleProduct />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
  });

  it('should render the SingleProduct component', () => {
    const { getByText } = render(<SingleProduct />, {
      wrapper: BrowserRouter
    });
    fireEvent.click(getByText('Add To Cart'));
  });

  it('should render the SingleProduct component', () => {
    Cookie.get = jest.fn().mockImplementation(() => '');
    const { getByText } = render(<SingleProduct />, {
      wrapper: BrowserRouter
    });
    fireEvent.click(getByText('Login to Shop'));
  });
});
