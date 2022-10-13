import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useHttpRequest from '../../../hooks/useHttpRequest';

const Sizes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checked, setChecked] = useState([]);

  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'sizes/'
  });

  const query = () => {
    const locationSearch = location.search;
    const sizes = checked.join(',');

    if (checked.length === 0 && locationSearch.includes('sizes')) {
      if (locationSearch.includes('&sizes')) {
        return navigate(locationSearch.replace(/[&]sizes=[^&]*/, ''));
      }
      return navigate(locationSearch.replace(/[?]sizes=[^&]*/, '?'));
    }

    if (checked.length !== 0 && !locationSearch) {
      return navigate(`?sizes=${sizes}`);
    }

    if (checked.length !== 0 && /sizes/.test(locationSearch)) {
      return navigate(
        locationSearch.replace(/[&]sizes=[^&]*/, `&sizes=${sizes}`)
      );
    }

    if (checked.length !== 0 && locationSearch) {
      return navigate(locationSearch.concat('&', `sizes=${sizes}`));
    }

    return navigate('?');
  };

  const handleCheck = (event) => {
    if (event.target.checked) setChecked([...checked, event.target.value]);

    setChecked(checked.filter((checkbox) => checkbox !== event.target.name));
  };

  useEffect(() => {
    query();
  }, [checked]);

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Size</h4>
            <div className="fw-size-choose">
                {error && <div>Error</div>}
                {loading && <div>Loading</div>}
                {data &&
                    data.map((size) => (
                        <div key={size._id}>
                            <input
                                type="checkbox"
                                id={size._id}
                                name={size.name}
                                title={size.name}
                                value={size.name}
                                onChange={handleCheck}
                            />
                            <label htmlFor={size.name}>{size.name}</label>
                        </div>
                    ))}
            </div>
        </div>
  );
};

export default Sizes;
