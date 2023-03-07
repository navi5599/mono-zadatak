import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

function NavBar() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    window.open('/', '_self');
  };
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h3>Showcar</h3>
      </Link>
      <p>すべての人が平和に暮らしていることを想像してみてください</p>
      {token ? (
        <h4 className="logout" onClick={handleLogout}>
          Log out
        </h4>
      ) : (
        ''
      )}
    </div>
  );
}

export default NavBar;
