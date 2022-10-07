import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';

const Search = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const {
    fetchRequest,
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: `products/?name=${searchTerm}`,
    preventAutoFetch: true
  });

  const search = () => {
    if (searchTerm.length > 0) {
      fetchRequest();
    }
  };

  return (
        <div className="col-lg-7 col-md-7">
            <div className="advanced-search">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="What do you need?"
                        value={searchTerm}
                        onChange={function (e) {
                          setSearchTerm(e.target.value);
                          search();
                        }}
                    />
                    {error && navigate('/error')}
                    {loading && (
                        <ul>
                            <li>Loading</li>
                        </ul>
                    )}
                    {searchTerm &&
                        data &&
                        data.map((product) => (
                            <ul key={product._id}>
                                <li
                                    key={product._id}
                                    onClick={() => setSearchTerm('')}
                                >
                                    <Link to={`/products/${product._id}`}>
                                        {product.name}
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    <button
                        type="button"
                        onClick={function () {
                          navigate(`/products/filter?name=${searchTerm}`);
                          setSearchTerm('');
                        }}
                    >
                        <i className="ti-search"></i>
                    </button>
                </div>
            </div>
        </div>
  );
};

export default Search;
