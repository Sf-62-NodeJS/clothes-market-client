import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Categories from './Filters/Categories';
import Price from './Filters/Price';
import Sizes from './Filters/Sizes';

const Filters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
            {location.search
              ? (
                <>
                    <button onClick={() => navigate('/products')}>
                        Clear Search
                    </button>
                    <br />
                    <br />
                </>
                )
              : (
                  ''
                )}
            <Categories />
            <Price />
            <Sizes />
        </div>
  );
};

export default Filters;
