import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import useCookie from '../../hooks/useCookie';

const Logout = () => {
  useHttpRequest({ method: 'GET', url: 'auth/logout/' });

  const { removeCookie } = useCookie();

  useEffect(() => {
    removeCookie();
  }, []);

  const navigate = useNavigate();

  return (
        <div>
            You are logged out successfully!
            <button onClick={() => navigate('/')}>Go to Main page</button>
        </div>
  );
};

export default Logout;
