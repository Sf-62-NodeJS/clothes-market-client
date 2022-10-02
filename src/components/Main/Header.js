import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';

function Header () {
  const {
    state: { error, data, loading }
  } = useHttpRequest({
    method: 'GET',
    url: '/categories/'
  });

  const navMenu = [
    { path: '/', title: 'Home' },
    { path: '/Shop', title: 'Shop' },
    { path: '/Contact', title: 'Contact' }
  ];

  const [active, setActive] = useState(window.location.pathname);
  const [searchTerm, setSearchTerm] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                                        onChange={(e) =>
                                          setSearchTerm(e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => searchTerm}
                                    >
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                {' '}
                                {isLoggedIn
                                  ? (
                                    <>
                                        <i className="fa fa-cart-arrow-down"></i>{' '}
                                        Shopping Cart
                                        <br />
                                        <i className="fa fa-user-circle"></i>{' '}
                                        Profile <br />
                                        <div
                                            onClick={() => setIsLoggedIn(false)}
                                        >
                                            <i className="fa fa-sign-out"></i>{' '}
                                            Logout
                                        </div>
                                    </>
                                    )
                                  : (
                                    <>
                                        <div
                                            onClick={() => setIsLoggedIn(true)}
                                        >
                                            <i className="fa fa-sign-in"></i>{' '}
                                            Login{' '}
                                        </div>
                                        <i className="fa fa-unlock-alt"></i>{' '}
                                        Register
                                    </>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-item">
                <div className="container">
                    <div className="nav-depart">
                        <div className="depart-btn">
                            <i className="ti-menu"></i>
                            <span>All categories</span>
                            <ul className="depart-hover">
                                {error && <li>Error...</li>}
                                {loading && <li>Loading...</li>}
                                {data &&
                                    data.map((category) => (
                                        <li
                                            key={category._id}
                                            onClick={() =>
                                              setActive(category._id)
                                            }
                                            className={
                                                active === category._id
                                                  ? 'active'
                                                  : 'null'
                                            }
                                        >
                                            <NavLink
                                                to={`/products/?category=${category.name}`}
                                            >
                                                {category.name}
                                            </NavLink>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            {navMenu.map((page) => (
                                <li
                                    key={page.path}
                                    onClick={() => setActive(page.path)}
                                    className={
                                        active === page.path ? 'active' : 'null'
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
