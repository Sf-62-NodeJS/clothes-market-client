import { useState } from 'react';
import Cookie from 'js-cookie';

const useCookie = () => {
  const [state, setState] = useState({
    isLoggedIn: false
  });

  const getCookie = () => {
    const cookie = Cookie.get('connect.sid');

    if (cookie) {
      setState(() => ({
        isLoggedIn: cookie
      }));
    }

    return cookie;
  };

  const removeCookie = () => {
    Cookie.remove('connect.sid');

    setState(() => ({ isLoggedIn: false }));
  };

  return { state, getCookie, removeCookie };
};

export default useCookie;
