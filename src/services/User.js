import useHttpRequest from '../hooks/useHttpRequest';

const User = () => {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'users/me'
  });

  const userError = error;
  const userLoading = loading;
  const userData = data;

  return { userError, userLoading, userData };
};

export default User;
