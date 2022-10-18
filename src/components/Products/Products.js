import React, { useEffect } from 'react';
import Filters from './Filters';
import useHttpRequest from '../../hooks/useHttpRequest';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../Main/Loading';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') || '';
  const category = searchParams.get('category') || '';
  const sizes = searchParams.get('sizes') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const {
    fetchRequest,
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: `products/?name=${name}&category=${category}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  });

  useEffect(() => {
    fetchRequest();
  }, [searchParams]);

  return (
        <section className="product-shop spad">
            <div className="container">
                <div className="row">
                    {<Filters />}
                    <div className="col-lg-9 order-1 order-lg-2">
                        <div className="product-list">
                            <div className="row">
                                {error && navigate('/error')}
                                {loading && <Loading />}
                                {data &&
                                    data.map((product) => (
                                        <div
                                            key={product._id}
                                            className="col-lg-4 col-sm-6"
                                        >
                                            <div className="product-item">
                                                <div className="pi-pic">
                                                    <Link to={product._id}>
                                                        <img
                                                            src={`${process.env.REACT_APP_SERVER_URL}image/${product.image}`}
                                                            alt=""
                                                        />
                                                    </Link>
                                                    <ul>
                                                        <li className="quick-view">
                                                            <Link
                                                                to={product._id}
                                                            >
                                                                View Product
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="pi-text">
                                                    <Link to={product._id}>
                                                        <h5>{product.name}</h5>
                                                    </Link>
                                                    <div className="product-price">
                                                        ${product.price}
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

export default Products;
