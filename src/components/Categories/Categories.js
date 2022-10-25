import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Loading from '../Main/Loading';

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'categories/'
  });

  const query = (name) => {
    const locationSearch = location.search;
    const urlParams = new URLSearchParams(locationSearch);

    if (locationSearch.includes('category')) {
      const category = urlParams.get('category');
      return locationSearch.replace(category, name);
    }

    return `${locationSearch}${!locationSearch ? '?' : '&'}category=${name}`;
  };

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Categories</h4>
            <ul className="filter-catagories">
                {error && navigate('/error')}
                {loading && <Loading />}
                {data &&
                    data.map((category) => (
                        <li key={category._id}>
                            <Link to={query(category.name)}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
  );
};

export default Categories;
