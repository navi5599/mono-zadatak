import React from 'react';
import { observer } from 'mobx-react-lite';
import sidebarStore from '../../stores/SideBarStore';

import './SideBar.css';

function SideBar() {
  return (
    <div className="sidebar">
      <h4>Search</h4>
      <input
        className="search_input"
        onChange={(e) => (sidebarStore.searchedCar = e.target.value)}
      ></input>
      <div className="filter_section">
        <button onClick={() => sidebarStore.handleFilter()}>Filter</button>
        {sidebarStore.showFilter ? (
          <>
            <button className="dropdown_filter">Filter</button>
            <button className="dropdown_filter">Filter</button>
            <button className="dropdown_filter">Filter</button>
          </>
        ) : (
          ''
        )}

        <button className="sort_button">Sort</button>
      </div>
    </div>
  );
}

export default observer(SideBar);
