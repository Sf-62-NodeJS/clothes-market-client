import React from 'react';
import Logo from '../../images/logo.png';

function Header () {
  return (
        <header className="header-section">
            <div className="container">
                <div className="inner-header">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <div className="logo">
                                <a href="#">
                                    <img src={Logo} alt="" />
                                </a>
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
                                <li>
                                    <a href="#">Women Clothing</a>
                                </li>
                                <li>
                                    <a href="#">Men Clothing</a>
                                </li>
                                <li>
                                    <a href="#">Underwear</a>
                                </li>
                                <li>
                                    <a href="#">Kids Clothing</a>
                                </li>
                                <li>
                                    <a href="#">Brand Fashion</a>
                                </li>
                                <li>
                                    <a href="#">Accessories/Shoes</a>
                                </li>
                                <li>
                                    <a href="#">Luxury Brands</a>
                                </li>
                                <li>
                                    <a href="#">Brand Outdoor Apparel</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <li className="active">
                                <a href="./index.html">Home</a>
                            </li>
                            <li>
                                <a href="#">Shop</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Pages</a>
                                <ul className="dropdown">
                                    <li>
                                        <a href="#">Blog Details</a>
                                    </li>
                                    <li>
                                        <a href="#">Shopping Cart</a>
                                    </li>
                                    <li>
                                        <a href="#">Checkout</a>
                                    </li>
                                    <li>
                                        <a href="#">Faq</a>
                                    </li>
                                    <li>
                                        <a href="#">Register</a>
                                    </li>
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
