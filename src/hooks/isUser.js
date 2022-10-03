import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

const isUser = () => {
  const [state, setState] = useState({
    status: false
  });

  const getCookie = () => {
    setState(() => ({ status: false }));
    const cookie = Cookie.get('connect.sid');

    if (cookie) {
      setState(() => ({
        status: true
      }));
    }
  };

  useEffect(() => {
    getCookie();
  }, []);

  return { state };
};

export default isUser;
