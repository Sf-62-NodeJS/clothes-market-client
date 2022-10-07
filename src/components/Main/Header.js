import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';
import useHttpRequest from '../../hooks/useHttpRequest';
import Logo from '../../images/logo.png';
import Search from './Search';

function Header () {
  const location = useLocation();

  const isCookie = Cookie.get('connect.sid');
  const sessionCookie = sessionStorage.getItem('cookieId');

  const { fetchRequest } = useHttpRequest({
    method: 'GET',
    url: 'auth/logout/',
    preventAutoFetch: true
  });

  const navMenu = [
    { path: '/', title: 'Home' },
    { path: '/products', title: 'Shop' },
    { path: '/contact', title: 'Contact' }
  ];

  useEffect(() => {
    if (sessionStorage?.getItem('cookieId') === (false || null)) {
      fetchRequest();
    }
  }, [sessionStorage.getItem('cookieId')]);

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
                        <Search />
                        <div className="col-lg-3 text-right col-md-3">
                            <ul className="nav-right">
                                {isCookie === sessionCookie
                                  ? (
                                    <>
                                        <li>
                                            <i className="fa fa-cart-arrow-down"></i>{' '}
                                            Shopping Cart
                                        </li>
                                        <br />
                                        <li>
                                            <NavLink to="/profile">
                                                <i className="fa fa-user-circle"></i>{' '}
                                                Profile
                                            </NavLink>
                                        </li>
                                        <br />
                                        <li
                                            onClick={function () {
                                              Cookie.remove('connect.sid');
                                              sessionStorage.removeItem(
                                                'cookieId'
                                              );
                                            }}
                                        >
                                            <NavLink to="/">
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
