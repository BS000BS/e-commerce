import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const user_email = e.target.elements.email.value;
    const user_password = e.target.elements.password.value;
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const user = registeredUsers.find((user) => user.email === user_email);

    if (user) {
      if (user.password === user_password) {
        localStorage.setItem('loggedIn', user.email);
        navigate('/');
      } else {
        setLoginError('Password is incorrect.');
      }
    } else {
      setLoginError('Email is not registered.');
    }
  }

  return (
    <>
      <form onSubmit={login} className="m-auto mt-5" style={{ width: '50vw' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text text-danger">
            {loginError === 'Email is not registered.' ? 'This email is not registered!' : ''}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" required />
          <div id="passwordHelp" className="form-text text-danger">
            {loginError === 'Password is incorrect.' ? 'Password was incorrect!' : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <div className="text-center">
        <p className="mt-5">
          Don't have an account? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
