import React from 'react';
import { Link } from 'react-router-dom';
import useHttpRequest from '../../../hooks/useHttpRequest';

const Categories = () => {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'categories/'
  });

  const query = (name) => {
    const locationHref = window.location.href;
    const locationSearch = window.location.search;
    const urlParams = new URLSearchParams(locationSearch);

    if (!locationHref.includes('?')) {
      return `?category=${name}`;
    }

    if (locationHref.includes('category')) {
      const category = urlParams.get('category');
      return locationSearch.replace(category, name);
    }

    return locationSearch.concat('&', `category=${name}`);
  };

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Categories</h4>
            <ul className="filter-catagories">
                {error && <li>Error...</li>}
                {loading && <li>Loading...</li>}
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
