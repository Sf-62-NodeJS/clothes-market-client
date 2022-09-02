import { React, useRef, useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../Header';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser('');
    setPwd('');
    setSuccess(true);
  };

  return (
        <>
            {success
              ? (
                <section>
                    <Header />
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/home">Go to Home</a>
                    </p>
                    <Footer />
                </section>
                )
              : (
                <>
                    <Header />
                    <section className="container-fluid w-50 justify-content-center mt-5">
                        <p
                            ref={errRef}
                            className={errMsg ? 'errmsg' : 'offscreen'}
                            aria-live="assertive"
                        >
                            {errMsg}
                        </p>
                        <h1 className="col d-flex justify-content-center mb-4">
                            Log in
                        </h1>
                        <form
                            className="form-outline mb-4"
                            onSubmit={handleSubmit}
                        >
                            <label className="form-label" htmlFor="username">
                                Email:
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />

                            <label className="form-label" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <div className="row mt-2 mb-4">
                                <div className="col d-flex justify-content-start">
                                    <div className="form-check pos">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id=""
                                            defaultChecked
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor=""
                                        >
                                            {' '}
                                            Remember me{' '}
                                        </label>
                                    </div>
                                </div>

                                <div className="col justify-content-end">
                                    <a
                                        className="text-decoration-none text-dark"
                                        href="#!"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <button className="btn btn-outline-primary btn-block mb-4">
                                Sign In
                            </button>
                        </form>
                        <p>
                            Need an Account?
                            <br />
                            <span className="line">
                                <a href="/register">Sign Up</a>
                            </span>
                        </p>
                    </section>
                    <Footer />
                </>
                )}
        </>
  );
};

export default Login;
