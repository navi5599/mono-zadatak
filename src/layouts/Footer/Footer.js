import React from 'react';
import './Footer.css';

import { observer } from 'mobx-react-lite';

function Footer() {
  return (
    <>
      <div className="footer">
        <h3 className="footer_logo">ショーカー</h3>
        <p className="footer_text">Imagine all the people living in peace</p>
      </div>
    </>
  );
}

export default observer(Footer);
