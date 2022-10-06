import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import useCookie from '../../hooks/useCookie';

const Logout = () => {
  useHttpRequest({ method: 'GET', url: 'auth/logout/' });

  const { removeCookie } = useCookie();

  useEffect(() => {
    removeCookie();
    sessionStorage.removeItem('cookieId');
  }, []);

  const navigate = useNavigate();

  return navigate('/');
};

export default Logout;
