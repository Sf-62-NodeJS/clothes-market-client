import User from './User';

const state = {
  data: {
    _id: '635006980e1ba0b0f5d1a951',
    Name: 'Name',
    Surname: 'Surname'
  },
  loading: true,
  error: null
};

jest.mock('../hooks/useHttpRequest', () => () => ({
  fetchRequest: jest.fn(),
  state
}));

describe('User', () => {
  it('should render', () => {
    const { userData } = User();
    expect(userData).toEqual({
      Name: 'Name',
      Surname: 'Surname',
      _id: '635006980e1ba0b0f5d1a951'
    });
  });
});
