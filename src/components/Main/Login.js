import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import Cookie from 'js-cookie';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const isCookie = Cookie.get('connect.sid');

  const {
    fetchRequest,
    state: { error }
  } = useHttpRequest({ method: 'POST', url: 'auth/' });

  const loginHandler = (event) => {
    event.preventDefault();
    fetchRequest({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  if (error) return navigate('/error');

  return isCookie
    ? (
        navigate('/')
      )
    : (
        <div className="register-login-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="login-form">
                            <h2>Login</h2>
                            <form onSubmit={loginHandler}>
                                <div className="group-input">
                                    <label htmlFor="email">
                                        Email address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        ref={emailRef}
                                        required
                                    />
                                </div>
                                <div className="group-input">
                                    <label htmlFor="password">Password *</label>
                                    <input
                                        type="password"
                                        id="password"
                                        role="password"
                                        ref={passwordRef}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="site-btn login-btn"
                                >
                                    Sign In
                                </button>
                            </form>
                            <div className="switch-login">
                                <Link to="/register">Or Create An Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Login;
