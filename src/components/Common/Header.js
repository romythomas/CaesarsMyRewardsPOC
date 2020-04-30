import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="header fixed-top">
    <div className="logo"> 
      <div id="sidebar_menu" className="sidebar__toggle"><span className="bar1"></span> <span className="bar2"></span> <span className="bar3"></span> </div><a href="#"><img src="../images/logo.png" alt="Caesars Entertainment Logo"/></a>
    </div>
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="https://www.caesars.com/myrewards/benefits-overview">
            BENEFITS
            <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="https://www.caesars.com/myrewards/earn-and-redeem">
            EARN & REDEEM
          </NavLink>
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="https://www.caesars.com/myrewards/promotions">
            PROMOTIONS
          </NavLink>
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="https://www.caesars.com/myrewards/partners">
            PARTNERS
          </NavLink>
          <NavLink exact activeClassName="active" className="nav-item nav-link" to="https://www.caesars.com/book">
            BOOK NOW
          </NavLink>
        </div>
      </div>
    </nav>
    <ul className="top-menu">
      <li className="user"> <a href="#"> <img src="../images/user.png" alt="user"/> <span className="username">Hello, Username</span></a> </li>
    </ul>
  </header>
  );
};

export default Header;
