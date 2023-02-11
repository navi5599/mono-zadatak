import React from 'react';
import { observer } from 'mobx-react-lite';
import sidebarStore from '../../stores/SideBarStore';

import './SideBar.css';

function SideBar() {
  return (
    <div className="sidebar">
      <h4>Search</h4>
      <input
        placeholder="Search model name .."
        className="search_input"
        onChange={(e) => (sidebarStore.searchedCar = e.target.value)}
      ></input>
      <div className="filter_section">
        <button onClick={() => sidebarStore.handleFilter()}>Filter</button>
        {sidebarStore.showFilter ? (
          <>
            <button className="dropdown_filter">Motortype</button>
            <button className="dropdown_filter">Price</button>
          </>
        ) : (
          ''
        )}

        <button
          className="sort_button"
          onClick={() => sidebarStore.handleSort()}
        >
          Sort
        </button>
        {sidebarStore.showSort ? (
          <>
            <button className="dropdown_filter">By Name</button>
            <button className="dropdown_filter">By Price</button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default observer(SideBar);
