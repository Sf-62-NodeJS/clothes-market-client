import React from 'react';
import useHttpRequest from '../../../hooks/useHttpRequest';

const Categories = () => {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'categories/'
  });

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Categories</h4>
            <ul className="filter-catagories">
                {error && <li>Error...</li>}
                {loading && <li>Loading...</li>}
                {data &&
                    data.map((category) => (
                        <li key={category._id}>{category.name}</li>
                    ))}
            </ul>
        </div>
  );
};

export default Categories;
