import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Price = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const query = () => {
    const locationSearch = location.search;
    const urlParams = new URLSearchParams(locationSearch);
    const minPriceParam = urlParams.get('minPrice');
    const maxPriceParam = urlParams.get('maxPrice');

    if (minPrice || maxPrice) {
      if (!locationSearch) {
        return navigate(`?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      }

      if (/minPrice/.test(locationSearch) && minPriceParam !== minPrice) {
        return navigate(locationSearch.replace(minPriceParam, minPrice));
      }

      if (/maxPrice/.test(locationSearch) && maxPriceParam !== maxPrice) {
        return navigate(locationSearch.replace(maxPriceParam, maxPrice));
      }

      return navigate(
        locationSearch.concat(
          '&',
                    `minPrice=${minPrice}&maxPrice=${maxPrice}`
        )
      );
    }
  };

  return (
        <div className="filter-widget">
            <h4 className="fw-title">Price</h4>
            <div className="filter-range-wrap">
                <div className="range-slider">
                    <div className="price-input">
                        <input
                            type="number"
                            min="0"
                            id="minPrice"
                            title="minPrice"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            min="10"
                            id="maxPrice"
                            title="maxPrice"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div onClick={query} title="filter" className="filter-btn">
                Filter Price
            </div>
        </div>
  );
};

export default Price;
