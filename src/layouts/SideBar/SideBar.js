import React from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';

import sidebarStore from '../../stores/SideBarStore';
import globalStore from '../../common/stores/GlobalStore';

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
        <h4>Sort</h4>
        <div
          onMouseEnter={() => sidebarStore.toggleOptions('name_opt')}
          onMouseLeave={() => sidebarStore.toggleOptions('name_opt')}
          className={`sort_div ${sidebarStore.showNameOptions ? 'show' : ''}`}
        >
          <h4>
            By name{' '}
            {globalStore.lockAscOptions || globalStore.lockDescOptions ? (
              <AiFillCheckSquare className="icon" />
            ) : (
              ''
            )}
          </h4>

          {sidebarStore.showNameOptions ? (
            <>
              <h5
                onClick={() => globalStore.getModelsByName('asc')}
                className={`options ${
                  globalStore.lockAscOptions ? 'confirmed_asc' : ''
                }`}
              >
                Ascending
              </h5>
              <h5
                onClick={() => globalStore.getModelsByName('desc')}
                className={`options ${
                  globalStore.lockDescOptions ? 'confirmed_asc' : ''
                }`}
              >
                Descending
              </h5>
            </>
          ) : (
            ''
          )}
        </div>

        <div
          onMouseEnter={() => sidebarStore.toggleOptions('price_opt')}
          onMouseLeave={() => sidebarStore.toggleOptions('price_opt')}
          className={`sort_div ${sidebarStore.showPriceOptions ? 'show' : ''}`}
        >
          <h4>
            By price{' '}
            {sidebarStore.lockAscPriceOptions ||
            sidebarStore.lockDescPriceOptions ? (
              <AiFillCheckSquare className="icon" />
            ) : (
              ''
            )}
          </h4>
          {sidebarStore.showPriceOptions ? (
            <>
              <h5
                onClick={() => sidebarStore.sortModels('asc')}
                className={`options ${
                  sidebarStore.lockAscPriceOptions ? 'confirmed_asc' : ''
                }`}
              >
                Ascending
              </h5>
              <h5
                onClick={() => sidebarStore.sortModels('desc')}
                className={`options ${
                  sidebarStore.lockDescPriceOptions ? 'confirmed_asc' : ''
                }`}
              >
                Descending
              </h5>
            </>
          ) : (
            ''
          )}
        </div>

        <h4>Filter</h4>
        <div
          onMouseEnter={() => sidebarStore.toggleOptions('motortype_opt')}
          onMouseLeave={() => sidebarStore.toggleOptions('motortype_opt')}
          className={`sort_div ${
            sidebarStore.showMotortypeOptions ? 'show_filter' : ''
          }`}
        >
          <h4>
            By Motortype{' '}
            {sidebarStore.lockBenzinOption ||
            sidebarStore.lockDieselOption ||
            sidebarStore.lockHybridOption ? (
              <AiFillCheckSquare className="icon" />
            ) : (
              ''
            )}
          </h4>
          {sidebarStore.showMotortypeOptions ? (
            <>
              <h5
                onClick={() => sidebarStore.sortByMotortype('Benzin')}
                className={`options ${
                  sidebarStore.lockBenzinOption ? 'confirmed_asc' : ''
                }`}
              >
                Benzin
              </h5>
              <h5
                onClick={() => sidebarStore.sortByMotortype('Diesel')}
                className={`options ${
                  sidebarStore.lockDieselOption ? 'confirmed_asc' : ''
                }`}
              >
                Diesel
              </h5>
              <h5
                onClick={() => sidebarStore.sortByMotortype('Hybrid')}
                className={`options ${
                  sidebarStore.lockHybridOption ? 'confirmed_asc' : ''
                }`}
              >
                Hybrid
              </h5>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(SideBar);
