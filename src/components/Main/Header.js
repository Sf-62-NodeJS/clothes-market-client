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
    { id: '/', text: 'Home' },
    { id: '/Shop', text: 'Shop' },
    { id: '/Contact', text: 'Contact' }
  ];
  const pages = [
    { id: '/Cart', text: 'Cart' },
    { id: '/Checkout', text: 'Checkout' },
    { id: '/Register', text: 'Register' }
  ];

  const [active, setActive] = useState();

  return (
        <header className="header-section">
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <NavLink to="/">
                                    <img src={Logo} alt="" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7">
                            <div className="advanced-search">
                                <button type="button" className="category-btn">
                                    All Categories
                                </button>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="What do you need?"
                                    />
                                    <button type="button">
                                        <i className="ti-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                <i className="fa fa-user"></i>Login
                                <div className="lan-selector" />
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
                                    key={page.id}
                                    onClick={() => setActive(page.id)}
                                    className={
                                        active === page.id ? 'active' : 'null'
                                    }
                                >
                                    <NavLink to={`${page.id}`}>
                                        {page.text}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <a>Pages</a>
                                <ul className="dropdown">
                                    {pages.map((page) => (
                                        <li key={page.id}>
                                            <NavLink to={`${page.text}`}>
                                                {page.text}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
  );
}

export default Header;
