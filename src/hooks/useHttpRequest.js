import { useEffect, useState } from 'react';

const useHttpRequest = ({ method, url, preventAutoFetch }) => {
  const [state, setState] = useState({
    error: null,
    loading: null,
    data: null
  });
  const fetchRequest = async (payload) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'token will be here later'
      },
      credentials: 'include'
    };

    if (payload && method !== 'GET') {
      requestOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}${url}`,
            requestOptions
    );

    if (response.status !== 200) {
      setState(() => ({
        data: null,
        loading: false,
        error: { message: response.statusText, code: response.status }
      }));
    } else {
      const responseData = await response.json();
      setState(() => ({
        data: responseData,
        loading: false,
        error: null
      }));
    }
  };

  useEffect(() => {
    if (method === 'GET' && !preventAutoFetch) {
      fetchRequest();
    }
  }, []);

  return { fetchRequest, state };
};

export default useHttpRequest;
