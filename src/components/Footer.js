import React from 'react';

function Footer () {
  return (
        <div className="container-fluid text-bg-dark">
            <footer className="py-1">
                <div className="row m-lg-1">
                    <div className="col-6 col-md-2 mb-3">
                        <h5 className="text-light">&copy; SOFTSERVE</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2 text-secondary">
                                Adress: xxxxxxxx
                            </li>
                            <li className="nav-item mb-2 text-secondary">
                                Phone: xxxxxxxxxx
                            </li>
                            <li className="nav-item mb-2 text-secondary">
                                Email: example@e-mail.com
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Information</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    About us
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Check out
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Serivius
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>My Account</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    My Account
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Shopping Cart
                                </a>
                            </li>
                            <li className="nav-item mb-2">
                                <a href="#" className="nav-link p-0 text-muted">
                                    Shop
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Join Our Newsletter Now</h5>
                            <p>
                                Get E-mail updates about our latest shop and
                                special offers.
                            </p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label className="visually-hidden">
                                    Email address
                                </label>
                                <input
                                    id="newsletter1"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Your Mail"
                                ></input>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row text-center justify-content-center border-top">
                    <p>&copy; 2022 SOFTSERVE, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
  );
}

export default Footer;
