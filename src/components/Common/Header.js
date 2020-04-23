import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="header fixed-top">
    <div className="logo"> 
      <div id="sidebar_menu" className="sidebar__toggle"><span className="bar1"></span> <span className="bar2"></span> <span className="bar3"></span> </div><a href="#"><img src="images/logo.png" alt="Caesars Entertainment Logo"/></a>
      
    </div>
    <nav className="navbar navbar-expand-lg">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa fa-th" aria-hidden="true"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <nav className="navbar-nav">
             <NavLink exact activeClassName="active" className="nav-item nav-link" to="/">
                BENEFITS
                <span className="sr-only">(current)</span>
             </NavLink>
             <NavLink exact activeClassName="active" className="nav-item nav-link" to="#earn">
             EARN & REDEEM
             </NavLink>
             <NavLink exact activeClassName="active" className="nav-item nav-link" to="#promotions">
             PROMOTIONS
             </NavLink>
             <NavLink exact activeClassName="active" className="nav-item nav-link" to="#partners">
             PARTNERS
             </NavLink>
             <NavLink exact activeClassName="active" className="nav-item nav-link" to="//https://www.caesars.com/book">
             BOOK NOW
            </NavLink>
          </nav>
      </div>
    </nav>
    <ul className="top-menu">
      <li className="user"> <a href="#"> <img src="images/user.png" alt="user"/> <span className="username">Hello, Username</span></a> </li>
    </ul>
  </header>
  );
};

export default Header;
