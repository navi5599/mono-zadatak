import React from 'react';
import Button from '../../components/Button/Button';
import './Footer.css';

import { observer } from 'mobx-react-lite';
import globalStore from '../../common/stores/GlobalStore';

function Footer() {
  return (
    <>
      <div className="footer">
        {globalStore.showLoadButton ? (
          <Button
            value="Load more"
            className="footer_button"
            onClickHandler={globalStore.getNewModels}
          />
        ) : (
          ''
        )}

        <h3 className="footer_logo">ショーカー</h3>
        <p className="footer_text">Imagine all the people living in peace</p>
      </div>
    </>
  );
}

export default observer(Footer);
