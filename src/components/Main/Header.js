import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';

function Header () {
  const navigate = useNavigate();
  const location = useLocation();

  const navMenu = [
    { path: '/', title: 'Home' },
    { path: '/products', title: 'Shop' },
    { path: '/contact', title: 'Contact' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const {
    fetchRequest,
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: `products/?name=${searchTerm}`,
    preventAutoFetch: true
  });

  const search = () => {
    if (searchTerm.length > 0) {
      fetchRequest();
    }
  };

  return (
        <header className="header-section">
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <NavLink to="/">
                                    <img src={Logo} alt="Logo" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7">
                            <div className="advanced-search">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="What do you need?"
                                        value={searchTerm}
                                        onChange={function (e) {
                                          setSearchTerm(e.target.value);
                                          search();
                                        }}
                                    />
                                    {error && navigate('/error')}
                                    {loading && (
                                        <ul>
                                            <li>Loading</li>
                                        </ul>
                                    )}
                                    {searchTerm &&
                                        data &&
                                        data.map((product) => (
                                            <ul key={product._id}>
                                                <li
                                                    key={product._id}
                                                    onClick={() =>
                                                      setSearchTerm('')
                                                    }
                                                >
                                                    <Link
                                                        to={`/products/${product._id}`}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </li>
                                            </ul>
                                        ))}
                                    <button
                                        type="button"
                                        onClick={function () {
                                          navigate(
                                                `/products/filter?name=${searchTerm}`
                                          );
                                          setSearchTerm('');
                                        }}
                                    >
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                {' '}
                                {sessionStorage.getItem('cookieId')
                                  ? (
                                    <>
                                        <li>
                                            <i className="fa fa-cart-arrow-down"></i>{' '}
                                            Shopping Cart
                                        </li>
                                        <br />
                                        <li>
                                            <i className="fa fa-user-circle"></i>{' '}
                                            Profile
                                        </li>
                                        <br />
                                        <li>
                                            <NavLink to="/logout">
                                                <i className="fa fa-sign-out"></i>{' '}
                                                Logout
                                            </NavLink>
                                        </li>
                                    </>
                                    )
                                  : (
                                    <>
                                        <li>
                                            <NavLink to="/login">
                                                <i className="fa fa-sign-in"></i>{' '}
                                                Login{' '}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <i className="fa fa-unlock-alt"></i>{' '}
                                            Register
                                        </li>
                                    </>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-item">
                <div className="container">
                    <nav className="nav-menu">
                        <ul>
                            {navMenu.map((page) => (
                                <li
                                    key={page.path}
                                    className={
                                        location.pathname === page.path
                                          ? 'active'
                                          : 'null'
                                    }
                                >
                                    <NavLink to={`${page.path}`}>
                                        {page.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
  );
}

export default Header;
