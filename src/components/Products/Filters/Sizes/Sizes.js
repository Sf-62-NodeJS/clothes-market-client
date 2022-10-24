import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useHttpRequest from '../../../../hooks/useHttpRequest';
import Loading from '../../../Main/Loading';

const Sizes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationSearch = location.search;
  const urlParams = new URLSearchParams(locationSearch);
  const sizes = urlParams.get('sizes');

  const [checked, setChecked] = useState(sizes || []);

  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: 'sizes/'
  });

  const query = () => {
    const sizes = checked.join(',');

    if (checked.length) {
      if (locationSearch.includes('sizes')) {
        return navigate(
          locationSearch.replace(/sizes=[^&]*/, `sizes=${sizes}`)
        );
      }

      return locationSearch.length
        ? navigate(locationSearch.concat(`&sizes=${sizes}`))
        : navigate(locationSearch.concat(`?sizes=${sizes}`));
    }

    return navigate(locationSearch.replace(/[?|&]sizes=[^&]*/, ''));
  };

  const handleCheck = (event) => {
    if (event.target.checked) setChecked([...checked, event.target.value]);

    if (!event.target.checked) {
      setChecked(
        checked.filter((checkbox) => checkbox !== event.target.name)
      );
    }
  };

  useEffect(() => {
    const sizes = setTimeout(() => {
      query();
    }, 500);

    return () => clearTimeout(sizes);
  }, [checked]);

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Size</h4>
            <div className="fw-size-choose">
                {error && navigate('/error')}
                {loading && <Loading />}
                {data &&
                    data.map((size) => (
                        <div key={size._id}>
                            <input
                                type="checkbox"
                                id={size._id}
                                title={size.name}
                                name={size.name}
                                value={size.name}
                                onChange={handleCheck}
                            />
                            <label htmlFor={size.name}>&nbsp;{size.name}</label>
                        </div>
                    ))}
            </div>
        </div>
  );
};

export default Sizes;
