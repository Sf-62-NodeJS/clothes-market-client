import React from 'react';

const Price = () => {
  return (
        <div className="filter-widget">
            <h4 className="fw-title">Price</h4>
            <div className="filter-range-wrap">
                <div className="range-slider">
                    <div className="price-input">
                        <input type="number" min="0" id="minamount" />
                        <input type="number" min="0" id="maxamount" />
                    </div>
                </div>
                <a href="#" className="filter-btn">
                    Filter
                </a>
            </div>
        </div>
  );
};

export default Price;
