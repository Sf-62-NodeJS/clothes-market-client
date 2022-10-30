import React from 'react';
import Comments from './Comments';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const state = {
  data: [
    {
      _id: '635006980e1ba0b0f5d1a951',
      userId: '63342f97fe9cc48bf8abbb2f',
      comment:
                'Loved this t-shirt. Nice fit. Looks pretty good quality too.',
      replyComments: ['62342f97fe9cc48bf8abbb2f'],
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

const mockedUsedNavigate = jest.fn();
const mockedSearchParams = {
  get: () => {
    return 'true';
  },
  delete: () => {
    return jest.fn();
  },
  append: () => {
    return true;
  }
};
const mockedSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => [mockedSearchParams, mockedSetSearchParams]
}));

describe('Comments', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '123456789');
  });
  it('should render when authorized', () => {
    render(<Comments productId={'635006980e1ba0b0f5d1a951'} />, {
      wrapper: BrowserRouter
    });
  });

  it('should render when not authorized', () => {
    Cookie.get = jest.fn().mockImplementation(() => '');
    mockedSearchParams.get = () => '';
    render(<Comments productId={'635006980e1ba0b0f5d1a951'} />, {
      wrapper: BrowserRouter
    });

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<Comments productId={''} />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<Comments productId={'635006980e1ba0b0f5d1a951'} />, {
      wrapper: BrowserRouter
    });
    expect(screen.getByText(/No comments to show.../i)).toBeInTheDocument();
  });
});

describe('Post comment', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '123456789');
  });

  it('should render', () => {
    const { getByText } = render(
            <BrowserRouter>
                <Comments />
            </BrowserRouter>
    );
    expect(getByText('Leave A Comment')).toBeInTheDocument();
  });

  it('should send comment', async () => {
    const { getByText, getByPlaceholderText } = render(
            <BrowserRouter>
                <Comments />
            </BrowserRouter>
    );
    const comment = 'test comment';
    const commentInput = getByPlaceholderText('Write comment...');
    const sendCommentButton = getByText('Send comment');
    fireEvent.change(commentInput, { target: { value: comment } });
    fireEvent.click(sendCommentButton);

    state.loading = false;
    state.error = {};
  });
});
