import React from 'react';
import './Login.css';

import userStore from '../../common/stores/userStore';
import { loginUser } from '../../common/services/userAuth';

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="login_container">
      <form className="form" onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => (userStore.username = e.target.value)}
        />
        <br></br>

        <label>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => (userStore.password = e.target.value)}
        />
        <br></br>

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
