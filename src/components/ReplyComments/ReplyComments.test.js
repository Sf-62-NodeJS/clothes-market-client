import React from 'react';
import ReplyComments from './ReplyComments';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const state = {
  data: [
    {
      _id: '635006980e1ba0b0f5d1a951',
      userId: '63342f97fe9cc48bf8abbb2f',
      comment:
                'Loved this t-shirt. Nice fit. Looks pretty good quality too.'
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
const searchParams = {
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
  useSearchParams: () => [searchParams, mockedSetSearchParams]
}));

describe('ReplyComments', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });
  });
  it('should render when authorized', () => {
    Cookie.get = jest.fn().mockImplementation(() => '123456789');
    render(<ReplyComments productId={'635006980e1ba0b0f5d1a951'} />, {
      wrapper: BrowserRouter
    });
  });

  it('should render when not authorized', () => {
    Cookie.get = jest.fn().mockImplementation(() => '');
    searchParams.get = () => '';
    render(<ReplyComments productId={'635006980e1ba0b0f5d1a951'} />, {
      wrapper: BrowserRouter
    });

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<ReplyComments />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
    state.loading = false;
    state.data = null;
  });
});

describe('ReplyCommentCreate', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    Cookie.get = jest.fn().mockImplementation(() => '123456789');
  });
  it('should render', () => {
    const { getByText } = render(
            <MemoryRouter>
                <ReplyComments />
            </MemoryRouter>
    );
    expect(getByText('Reply to this comment')).toBeInTheDocument();
  });

  it('should cancel reply comment', async () => {
    const { getByText } = render(
            <MemoryRouter>
                <ReplyComments />
            </MemoryRouter>
    );

    const replyCommentButton = getByText('Reply to this comment');
    fireEvent.click(replyCommentButton);

    const cancelCommentInput = getByText('Cancel');
    fireEvent.click(cancelCommentInput);
  });

  it('should send comment', async () => {
    const { getByText, getByPlaceholderText } = render(
            <MemoryRouter>
                <ReplyComments />
            </MemoryRouter>
    );
    const comment = 'test comment';
    const replyCommentButton = getByText('Reply to this comment');
    fireEvent.click(replyCommentButton);

    const commentInput = getByPlaceholderText('Write reply comment...');
    fireEvent.change(commentInput, { target: { value: comment } });

    const sendReplyCommentButton = getByText('Send reply comment');
    fireEvent.click(sendReplyCommentButton);

    state.loading = false;
    state.error = {};
  });

  it('should render error component', () => {
    render(<ReplyComments />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();
  });
});
