import React from 'react';
import './WelcomePage.css';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="welcome_container">
      <h1>Welcome</h1>
      <h4>Please log in</h4>
      <Link className="btn login_btn" to={'/login'}>
        Log in
      </Link>
    </div>
  );
}

export default WelcomePage;
