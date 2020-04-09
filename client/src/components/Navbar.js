import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/')
  };

  return (
      <nav>
        <div className="container">
          <div className="nav-wrapper" style={{ padding: '0 2rem' }}>
            <span className="brand-logo"><i className="fas fa-link"></i>Links app</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink to="/create"><i className="fas fa-plus-circle"></i>Створити</NavLink></li>
              <li><NavLink to="/links"><i className="fas fa-list-alt"></i>Посилання</NavLink></li>
              <li><a href="/" onClick={logoutHandler}><i className="fas fa-door-open"></i>Вийти</a></li>
            </ul>
          </div>
        </div>
      </nav>
  )
};
