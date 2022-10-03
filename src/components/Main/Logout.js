import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';

const Logout = () => {
  useHttpRequest({ method: 'GET', url: 'auth/logout/' });
  Cookie.remove('connect.sid');

  const navigate = useNavigate();

  return (
        <div>
            You are logged out successfully!
            <button onClick={() => navigate('/')}>Go to Main page</button>
        </div>
  );
};

export default Logout;
