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
        <button onClick={() => sidebarStore.handleFilterAndSort('filter')}>
          Filter
        </button>
        {sidebarStore.showFilter ? (
          <>
            <button className="dropdown_filter">By Motorype</button>
            <button className="dropdown_filter">By Price</button>
          </>
        ) : (
          ''
        )}

        <button
          className="sort_button"
          onClick={() => sidebarStore.handleFilterAndSort('sort')}
        >
          Sort
        </button>
        {sidebarStore.showSort ? (
          <>
            <button
              onClick={() => sidebarStore.handleSortOptions('sort_name')}
              className="dropdown_filter"
            >
              By Name
            </button>
            {sidebarStore.showNameOptionSort ? (
              <>
                <button className="options_button">Ascending</button>
                <button className="options_button">Descending</button>
              </>
            ) : (
              ''
            )}

            <button
              onClick={() => sidebarStore.handleSortOptions('price_name')}
              className="dropdown_filter"
            >
              By Price
            </button>
            {sidebarStore.showPriceOptionSort ? (
              <>
                <button
                  onClick={() => sidebarStore.sortModels('asce')}
                  className="options_button"
                >
                  Ascending
                </button>
                <button
                  onClick={() => sidebarStore.sortModels('desc')}
                  className="options_button"
                >
                  Descending
                </button>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default observer(SideBar);
