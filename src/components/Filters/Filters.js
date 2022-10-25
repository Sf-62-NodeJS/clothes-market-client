import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Categories from '../Categories/Categories';
import Price from '../Price/Price';
import Sizes from '../Sizes/Sizes';

const Filters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
            {location.search && (
                <>
                    <button
                        onClick={() => navigate('/products')}
                        className="btn btn-dark btn-sm"
                    >
                        Clear Filters
                    </button>
                    <br />
                    <br />
                </>
            )}
            <Categories />
            <Price />
            <Sizes />
        </div>
  );
};

export default Filters;
