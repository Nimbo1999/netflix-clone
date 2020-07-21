/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faGift,
  faBell,
  faSortDown,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectSearchInput,
  selectSearchLoading,
} from '../../redux/search-movies/search-movies.selector';
import {
  searchText,
  fetchMoviesStart,
} from '../../redux/search-movies/search-movies.actions';

import NetFlixLogo from '../../assets/netflix-logo.png';

import './style.scss';

const Header = ({ searchText, setSearchText, fetchMoviesStart, loading }) => {
  const [opacity, setOpacity] = useState(0);
  const [searching, search] = useState(false);
  const inputRef = useRef(null);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

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
            ? `linear-gradient(to bottom, rgba(0, 0, 0, .7) 10%,rgba(0, 0, 0, ${
                opacity / 100
              }))`
            : `linear-gradient(to bottom, rgba(0, 0, 0,  1) 10%,rgba(0,0,0, ${
                opacity / 100
              }))`,
      }}
    >
      <nav>
        <div className="logo-container">
          <img src={NetFlixLogo} alt="Netflix Logo" />
        </div>

        <ul className="menu-items">
          <li className="item">
            <Link to="/">Início</Link>
          </li>
          <li className="item">
            <a href="/">Mais recentes</a>
          </li>
        </ul>

        <div className="user-menu">
          <div
            className="search-container"
            style={{
              borderColor: searching ? '#fff' : 'transparent',
              backgroundColor: searching ? 'rgba(0, 0, 0, .75)' : 'transparent',
            }}
          >
            <button
              type="button"
              onClick={() => {
                search(!searching);
                inputRef.current.focus();
              }}
            >
              {loading ? (
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  spin
                  style={{ color: '#ee0021' }}
                />
              ) : (
                <FontAwesomeIcon icon={faSearch} />
              )}
            </button>
            <input
              ref={inputRef}
              type="search"
              placeholder="Títulos e gêneros"
              className="input-search"
              value={searchText}
              onChange={(e) => {
                const VALUE = e.target.value;
                setSearchText(VALUE);
                if (VALUE !== '') fetchMoviesStart();
                if (pathname !== '/search') history.push('/search');
              }}
              style={{ maxWidth: searching ? '200px' : '0px' }}
              onBlur={() => {
                search(!searching);
                setSearchText('');
              }}
            />
          </div>
          <button type="button" disabled>
            <FontAwesomeIcon icon={faGift} />
          </button>
          <button type="button" disabled>
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button type="button" disabled>
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

const mapStateToProps = createStructuredSelector({
  searchText: selectSearchInput,
  loading: selectSearchLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchText: (text) => dispatch(searchText(text)),
  fetchMoviesStart: () => dispatch(fetchMoviesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
