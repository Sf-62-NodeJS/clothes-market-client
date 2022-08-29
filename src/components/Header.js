import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../src/SoftServe_logo_new.png';

function Header () {
  return (
        <div>
            <div className="d-flex flex-wrap align-items-center  py-1 mb-0">
                <a className="navbar-brand" href="home">
                    {' '}
                    <img src={Logo} width="150px" alt="SoftServe logo"></img>
                </a>
                <div className="col text-end m-1">
                    <h3>Clothes Store</h3>
                </div>

                <div className="col text-end m-lg-1">
                    <Link
                        to="/login"
                        className="btn btn-outline-primary me-2 btn-sm"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="btn btn-outline-primary btn-sm "
                    >
                        Sign-up
                    </Link>
                </div>
            </div>
            <div className="p-1 text-bg-dark">
                <div className="container-fluid p-1">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <div className="dropdown">
                                <li>
                                    <button
                                        className="btn btn-secondary dropdown-toggle nav-link px-2 text-white"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span>DEPARTMENTS</span>
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Womens Clothing
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Mens Clothing
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Underwear
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Kids Clothing
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Brand Fashion
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Accessories/Shoes
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Luxury Brands
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Brand Outdoor Apparel
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                            <li>
                                <a
                                    href="/home"
                                    className="nav-link px-2 text-white btn"
                                >
                                    HOME
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 text-white btn"
                                >
                                    SHOP
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 text-white btn"
                                >
                                    COLLECTION
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 text-white btn"
                                >
                                    BLOG
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 text-white btn"
                                >
                                    CONTACT
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link px-2 text-white btn"
                                >
                                    PAGES
                                </a>
                            </li>
                        </ul>
                        <form
                            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                            role="search"
                        >
                            <input
                                type="search"
                                className="form-control form-control-dark text-bg-dark"
                                placeholder="Search..."
                                aria-label="Search"
                            ></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Header;
