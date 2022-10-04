import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useHttpRequest from '../../hooks/useHttpRequest';
import useCookie from '../../hooks/useCookie';

const Login = () => {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    fetchRequest,
    state: { error }
  } = useHttpRequest({ method: 'POST', url: 'auth/' });

  const useLoginHandler = (event) => {
    event.preventDefault();
    fetchRequest({ email, password });

    const {
      state: { status }
    } = useCookie();

    setUser(status);
  };

  if (error) return navigate('/error');

  return user
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
                            <form onSubmit={useLoginHandler}>
                                <div className="group-input">
                                    <label htmlFor="email">
                                        Email address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        value={email}
                                        required
                                    />
                                </div>
                                <div className="group-input">
                                    <label htmlFor="password">Password *</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                        value={password}
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
