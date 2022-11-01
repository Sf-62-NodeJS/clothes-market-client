import React from 'react';
import SingleComment from './SingleComment';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const mockedFetchRequest = jest.fn();
const state = {
  data: {
    name: 'name',
    surname: 'surname'
  },
  loading: true,
  error: null
};

jest.mock('../../hooks/useHttpRequest', () => () => ({
  fetchRequest: mockedFetchRequest,
  state
}));

const userData = { _id: '63342f97fe9cc48bf8abbb2f' };

jest.mock('../../services/User', () => () => ({
  userData
}));

const mockedUsedNavigate = jest.fn();
const mockedSearchParams = {
  get: () => {
    return true;
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
  let props;

  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    props = {
      userId: '63342f97fe9cc48bf8abbb2f',
      commentId: '635006980e1ba0b0f5d1a951',
      commentValue: 'This is a comment'
    };

    Cookie.get = jest.fn().mockImplementation(() => '123456789');
  });
  it('should render when authorized', () => {
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
  });

  it('should render when not authorized', () => {
    Cookie.get = jest.fn().mockImplementation(() => '');
    mockedSearchParams.get = () => '';
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });

    state.error = {};
    state.loading = false;
    state.data = null;
  });

  it('should render error component', () => {
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
    expect(mockedUsedNavigate).toBeCalled();

    state.error = null;
    state.loading = false;
    state.data = null;
  });
});

describe('<CommentUpdate />', () => {
  let props;

  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=123456789'
    });

    props = {
      userId: '63342f97fe9cc48bf8abbb2f',
      commentId: '635006980e1ba0b0f5d1a951',
      commentValue: 'This is a comment'
    };

    Cookie.get = jest.fn().mockImplementation(() => '123456789');

    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
  });

  it('should click a button to edit a comment', () => {
    const editButton = screen.getByText(/Edit comment/i);
    fireEvent.click(editButton);

    const updateButton = screen.getByText(/Update comment/i);
    expect(updateButton).toBeInTheDocument();

    const updateTextField = screen.getByRole('textbox');
    fireEvent.change(updateTextField, {
      target: { value: 'Updated comment' }
    });
    fireEvent.click(updateButton);
  });

  it('should click a button to delete a comment', () => {
    const editButton = screen.getByText(/Edit comment/i);
    fireEvent.click(editButton);

    const deleteButton = screen.getByText(/Delete comment/i);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
  });

  it('should cancel to edit a comment', () => {
    const editButton = screen.getByText(/Edit comment/i);
    fireEvent.click(editButton);

    const updateButton = screen.getByText(/Update comment/i);
    expect(updateButton).toBeInTheDocument();

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    state.error = {};
  });

  it('should update comment and get an error', () => {
    const editButton = screen.getByText(/Edit comment/i);
    fireEvent.click(editButton);

    const updateButton = screen.getByText(/Update comment/i);
    expect(updateButton).toBeInTheDocument();

    const updateTextField = screen.getByRole('textbox');
    fireEvent.change(updateTextField, {
      target: { value: 'Updated comment' }
    });
    fireEvent.click(updateButton);

    expect(mockedUsedNavigate).toBeCalled();
  });

  it('should set searchParams', () => {
    fireEvent.click(screen.getByText('Edit comment'));
    fireEvent.click(screen.getByText('Delete Comment'));
    expect(mockedFetchRequest).toHaveBeenCalled();
  });

  it('should cancel reply comment', async () => {
    const replyCommentButton = screen.getByText('Reply to this comment');
    fireEvent.click(replyCommentButton);

    const cancelCommentInput = screen.getByText('Cancel');
    fireEvent.click(cancelCommentInput);
  });

  it('should send reply comment', async () => {
    const comment = 'test comment';
    const replyCommentButton = screen.getByText('Reply to this comment');
    fireEvent.click(replyCommentButton);

    const commentInput = screen.getByPlaceholderText(
      'Write reply comment...'
    );
    fireEvent.change(commentInput, { target: { value: comment } });

    const sendReplyCommentButton = screen.getByText('Send reply comment');
    fireEvent.click(sendReplyCommentButton);
  });
});
