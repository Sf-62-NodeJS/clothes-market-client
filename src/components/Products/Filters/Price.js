import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Price = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let searchLine = location.search;
  const urlParams = new URLSearchParams(searchLine);
  const minPriceParam = urlParams.get('minPrice');
  const maxPriceParam = urlParams.get('maxPrice');

  const [minPrice, setMinPrice] = useState(minPriceParam || '');
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');

  useEffect(() => {
    const price = setTimeout(() => {
      if (+minPrice) {
        if (!minPriceParam) {
          searchLine = searchLine.concat(
                        `${searchLine.length ? '&' : '?'}minPrice=${minPrice}`
          );
        }

        searchLine = searchLine.replace(minPriceParam, minPrice);
      }

      if (+maxPrice) {
        if (!maxPriceParam) {
          searchLine = searchLine.concat(
                        `${searchLine.length ? '&' : '?'}maxPrice=${maxPrice}`
          );
        }

        searchLine = searchLine.replace(maxPriceParam, maxPrice);
      }

      navigate(searchLine);
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
            </div>
        </div>
  );
};

export default Price;
