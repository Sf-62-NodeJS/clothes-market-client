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
  });

  it('should render without crashing', () => {
    const { getByText } = render(
            <BrowserRouter>
                <SingleComment {...props} />
            </BrowserRouter>
    );
    expect(getByText('Edit comment')).toBeInTheDocument();
  });

  it('should click a button to edit a comment', () => {
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
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

  it('should cancel to edit a comment', () => {
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
    const editButton = screen.getByText(/Edit comment/i);
    fireEvent.click(editButton);

    const updateButton = screen.getByText(/Update comment/i);
    expect(updateButton).toBeInTheDocument();

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    state.error = {};
  });

  it('should update comment and get an error', () => {
    render(<SingleComment {...props} />, { wrapper: BrowserRouter });
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
    const { getByText } = render(<SingleComment {...props} />);
    fireEvent.click(getByText('Delete Comment'));
    expect(mockedFetchRequest).toHaveBeenCalled();
  });
});
