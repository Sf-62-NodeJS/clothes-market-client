import React from 'react';
import Categories from './Filters/Categories';
import Price from './Filters/Price';
import Sizes from './Filters/Sizes';

const Filters = () => {
  return (
        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
            <Categories />
            <Price />
            <Sizes />
        </div>
  );
};

export default Filters;
