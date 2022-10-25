import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Price = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let locationSearch = location.search;
  const urlParams = new URLSearchParams(locationSearch);
  const minPriceParam = urlParams.get('minPrice');
  const maxPriceParam = urlParams.get('maxPrice');

  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');

  const queryStart = () => {
    return locationSearch.length ? '&' : '?';
  };

  useEffect(() => {
    const price = setTimeout(() => {
      if (+minPrice) {
        if (!minPriceParam) {
          locationSearch = locationSearch.concat(
                        `${queryStart()}minPrice=${minPrice}`
          );
        }

        locationSearch = locationSearch.replace(minPriceParam, minPrice);
      }

      if (+maxPrice) {
        if (!maxPriceParam) {
          locationSearch = locationSearch.concat(
                        `${queryStart()}maxPrice=${maxPrice}`
          );
        }

        locationSearch = locationSearch.replace(maxPriceParam, maxPrice);
      }

      navigate(locationSearch);
    }, 1000);

    return () => clearTimeout(price);
  }, [minPrice, maxPrice]);

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
                {(minPrice || maxPrice) && (
                    <button
                        onClick={() => {
                          setMaxPrice('');
                          setMinPrice('');
                        }}
                        className="btn btn-dark btn-sm"
                    >
                        Clear Prices
                    </button>
                )}
            </div>
        </div>
  );
};

export default Price;
