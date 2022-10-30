import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Loading from '../Main/Loading';
import SingleCategory from '../SingleCategory/SingleCategory';
import Comments from '../Comments/Comments';
import Cookie from 'js-cookie';

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  let [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  const isAuthorized = Cookie.get('connect.sid');

  const increaseQuantity = () => {
    quantity = quantity + 1;
    setQuantity(quantity);
  };

  const decreaseQuantity = () => {
    if (quantity - 1 > 0) {
      quantity = quantity - 1;
      setQuantity(quantity);
    }
  };

  const {
    fetchRequest: productRequest,
    state: {
      error: productError,
      data: productData,
      loading: productLoading
    }
  } = useHttpRequest({
    method: 'GET',
    url: `products/?_id=${id}`
  });

  const {
    state: { error: sizesError, data: sizesData, loading: sizesLoading }
  } = useHttpRequest({
    method: 'GET',
    url: 'sizes/'
  });

  const {
    fetchRequest: cartRequest,
    state: { error: cartError, data: cartData, loading: cartLoading }
  } = useHttpRequest({
    method: 'POST',
    url: 'users/cart/'
  });

  const addToCart = () => {
    cartRequest({
      productId: id,
      sizeId: size,
      quantity
    });
  };

  useEffect(() => {
    productRequest();
  }, [id]);

  return (
        <React.Fragment key={id}>
            <section className="product-shop spad page-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg">
                            {productError && navigate('/error')}
                            {productLoading && <Loading />}
                            {productData && (
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="product-pic-zoom">
                                            <img
                                                className="product-big-img"
                                                src={`${process.env.REACT_APP_SERVER_URL}image/${productData[0].image}`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="product-details">
                                            <div className="pd-title">
                                                {
                                                    <SingleCategory
                                                        id={
                                                            productData[0]
                                                              .category
                                                        }
                                                    />
                                                }
                                                <h3>{productData[0].name}</h3>
                                            </div>
                                            <div className="pd-desc">
                                                <p>
                                                    {productData[0].description}
                                                </p>
                                                <h4>${productData[0].price}</h4>
                                            </div>
                                            <div className="pd-size-choose">
                                                <div>Choose Your Size:</div>
                                                <div
                                                    className="btn-group btn-group-toggle"
                                                    data-toggle="buttons"
                                                >
                                                    {sizesLoading && (
                                                        <Loading />
                                                    )}
                                                    {sizesError &&
                                                        navigate('/error')}
                                                    {sizesData &&
                                                        sizesData
                                                          .filter((size) =>
                                                            productData[0].sizes.includes(
                                                              size._id
                                                            )
                                                          )
                                                          .map((size) => (
                                                                <React.Fragment
                                                                    key={
                                                                        size._id
                                                                    }
                                                                >
                                                                    <label
                                                                        key={
                                                                            size._id
                                                                        }
                                                                        className="btn btn-secondary"
                                                                    >
                                                                        <input
                                                                            key={
                                                                                size._id
                                                                            }
                                                                            type="radio"
                                                                            name="size"
                                                                            title={
                                                                                size.name
                                                                            }
                                                                            value={
                                                                                size._id
                                                                            }
                                                                            onClick={(
                                                                              e
                                                                            ) =>
                                                                              setSize(
                                                                                e
                                                                                  .target
                                                                                  .value
                                                                              )
                                                                            }
                                                                        />{' '}
                                                                        {
                                                                            size.name
                                                                        }
                                                                    </label>
                                                                </React.Fragment>
                                                          ))}
                                                </div>
                                            </div>
                                            <div>Select Quantity:</div>
                                            <div className="card col-2">
                                                <div className="card-body">
                                                    {quantity}
                                                </div>
                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                >
                                                    <button
                                                        onClick={
                                                            increaseQuantity
                                                        }
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={
                                                            decreaseQuantity
                                                        }
                                                        className="btn btn-secondary btn-sm"
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                            {cartLoading && <Loading />}
                                            {cartError && navigate('/error')}
                                            {cartData && (
                                                <div
                                                    className="alert alert-success"
                                                    role="alert"
                                                >
                                                    You just add{' '}
                                                    {productData[0].name} to
                                                    cart!
                                                </div>
                                            )}
                                            {isAuthorized
                                              ? (
                                                <React.Fragment>
                                                    <button
                                                        onClick={addToCart}
                                                        className="btn btn-success"
                                                        disabled={!size}
                                                    >
                                                        Add To Cart
                                                    </button>{' '}
                                                    <Link to="/cart">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                        >
                                                            View Cart
                                                        </button>
                                                    </Link>
                                                </React.Fragment>
                                                )
                                              : (
                                                <Link to="/login">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                    >
                                                        Login to Shop
                                                    </button>
                                                </Link>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Comments productId={id} />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
  );
};

export default SingleProduct;
