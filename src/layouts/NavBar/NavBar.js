import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h3>Showcar</h3>
      </Link>
      <p>すべての人が平和に暮らしていることを想像してみてください</p>
    </div>
  );
}

export default NavBar;
