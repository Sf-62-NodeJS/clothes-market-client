import React from 'react';
import useHttpRequest from '../../../hooks/useHttpRequest';

const Sizes = () => {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'sizes/'
  });

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Size</h4>
            <div className="fw-size-choose">
                {error && <div>Error</div>}
                {loading && <div>Loading</div>}
                {data &&
                    data.map((size) => (
                        <div className="sc-item" key={size._id}>
                            <input type="radio" id={size.name} />
                            <label htmlFor={size.name}>{size.name}</label>
                        </div>
                    ))}
            </div>
        </div>
  );
};

export default Sizes;
