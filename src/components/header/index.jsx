import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faGift,
  faBell,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

import NetFlixLogo from '../../assets/netflix-logo.png';

import './style.scss';

const Header = () => {
  const [opacity, setOpacity] = useState(0);

  window.onscroll = () => {
    setOpacity(
      document.documentElement.scrollTop > 100
        ? 100
        : document.documentElement.scrollTop
    );
  };

  return (
    <header
      className="app-header"
      style={{
        backgroundImage:
          opacity <= 99
            ? `linear-gradient(to bottom, rgba(0, 0, 0, .7) 10%,rgba(0, 0, 0, ${opacity / 100 }))`
            : `linear-gradient(to bottom, rgba(0, 0, 0,  1) 10%,rgba(0,0,0, ${opacity / 100 }))`,
      }}
    >
      <nav>
        <div className="logo-container">
          <img src={NetFlixLogo} alt="Netflix Logo" />
        </div>

        <ul className="menu-items">
          <li className="item">
            <a href="/">Início</a>
          </li>
          <li className="item">
            <a href="/">Séries</a>
          </li>
          <li className="item">
            <a href="/">Filmes</a>
          </li>
          <li className="item">
            <a href="/">Mais recentes</a>
          </li>
          <li className="item">
            <a href="/">Minha lista</a>
          </li>
        </ul>

        <div className="user-menu">
          <button type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faGift} />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button type="button">
            <div className="profile-box">
              <div>
                <img
                  src="https://occ-0-100-420.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABSDnuFQ2Fx7OJYxMxRlE3NhGHgObmt1L_6EIwyzTawqf0-Dhg2taMtw_eD-xOXKGvGb6cG0m-sCXwYkYCh4z5A0.png?r=c36"
                  alt="profile"
                />
              </div>
              <FontAwesomeIcon icon={faSortDown} />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
