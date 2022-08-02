import React from 'react';
import './App.css';
import useHttpRequest from '../../hooks/useHttpRequest';

function App () {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: '/users/62dd1bacf99611b5e71ec619'
  });

  return (
        <div className="App">
            {error && <div>Error...</div>}
            {loading && <div>Loading...</div>}
            {data && (
                <div>
                    <div>id: {data._id}</div>
                    <div>Name: {data.name}</div>
                </div>
            )}
        </div>
  );
}

export default App;
