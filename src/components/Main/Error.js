import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
        <div>
            Oops, something went wrong...
            <button onClick={() => navigate('/')}>Go to Main page</button>
        </div>
  );
};

export default Error;
