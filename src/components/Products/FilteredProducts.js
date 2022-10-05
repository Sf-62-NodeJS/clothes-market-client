import React, { useEffect } from 'react';
import Filters from './Filters';
import useHttpRequest from '../../hooks/useHttpRequest';
import { useSearchParams } from 'react-router-dom';

const FilteredProducts = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name');
  const category = searchParams.get('category');
  const size = searchParams.get('size');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const searchUrl = () => {
    const searchUrl = ['products/?'];

    if (name) searchUrl.push(`name=${name}`);
    if (category) searchUrl.push(`category=${category}`);
    if (size) searchUrl.push(`sizes=${size}`);
    if (minPrice) searchUrl.push(`minPrice=${minPrice}`);
    if (maxPrice) searchUrl.push(`maxPrice=${maxPrice}`);

    return searchUrl.join('&');
  };

  const {
    fetchRequest,
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: searchUrl()
  });

  useEffect(() => {
    fetchRequest();
  }, [category, size, minPrice, maxPrice]);

  return (
        <section className="product-shop spad">
            <div className="container">
                <div className="row">
                    {<Filters />}
                    <div className="col-lg-9 order-1 order-lg-2">
                        <div className="product-list">
                            <div className="row">
                                {error && <li>Error...</li>}
                                {loading && <li>Loading...</li>}
                                {data &&
                                    data.map((product) => (
                                        <div
                                            key={product._id}
                                            className="col-lg-4 col-sm-6"
                                        >
                                            <div className="product-item">
                                                <div className="pi-pic">
                                                    <img
                                                        src={`${process.env.REACT_APP_SERVER_URL}uploads/images/${product.image}`}
                                                        alt=""
                                                    />
                                                    <ul>
                                                        <li className="w-icon active">
                                                            <a
                                                                href={
                                                                    product._id
                                                                }
                                                            >
                                                                <i className="icon_bag_alt"></i>
                                                                Add to cart
                                                            </a>
                                                        </li>
                                                        <li className="quick-view">
                                                            <a
                                                                href={
                                                                    product._id
                                                                }
                                                            >
                                                                View Product
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="pi-text">
                                                    <a href="product">
                                                        <h5>{product.name}</h5>
                                                    </a>
                                                    <div className="product-price">
                                                        {product.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default FilteredProducts;
