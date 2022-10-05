import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

function Header () {
  const navigate = useNavigate();

  const {
    getCookie,
    state: { isLoggedIn }
  } = useCookie();

  const navMenu = [
    { path: '/', title: 'Home' },
    { path: '/products', title: 'Shop' },
    { path: '/contact', title: 'Contact' }
  ];

  const [isActive, setIsActive] = useState(window.location.pathname);
  const [searchTerm, setSearchTerm] = useState('');

  const search = (searchTerm) => {
    navigate(`/products/filter?name=${searchTerm}`);
  };

  useEffect(() => {
    getCookie();
  }, []);

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
                                        onClick={() => search(searchTerm)}
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
                                        <NavLink
                                            to="/logout"
                                            onClick={() =>
                                              setIsActive('/logout')
                                            }
                                        >
                                            <i className="fa fa-sign-out"></i>{' '}
                                            Logout
                                        </NavLink>
                                    </>
                                    )
                                  : (
                                    <>
                                        <div>
                                            <NavLink
                                                to="/login"
                                                style={
                                                    isActive === '/login'
                                                      ? { color: 'black' }
                                                      : {}
                                                }
                                                onClick={() =>
                                                  setIsActive('/login')
                                                }
                                            >
                                                <i className="fa fa-sign-in"></i>{' '}
                                                Login{' '}
                                            </NavLink>
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
                    <nav className="nav-menu">
                        <ul>
                            {navMenu.map((page) => (
                                <li
                                    key={page.path}
                                    onClick={() => setIsActive(page.path)}
                                    className={
                                        isActive === page.path
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
