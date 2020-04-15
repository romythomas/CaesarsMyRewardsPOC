import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="header">      
        <a href="#default" className="logo">
        <img src="https://www.caesars.com/myrewards/profile/images/caesars_rewards_logo_white.png" alt="Caesars_Logo"></img>  
        </a>
        <div className="header-left">
          <nav>
            <NavLink exact activeClassName="active" className="navbar__link" to="/">
              Benefits
            </NavLink>
            <NavLink exact activeClassName="active" className="navbar__link" to="#earn">
              Earn &amp; Redeem
            </NavLink>
            <NavLink exact activeClassName="active" className="navbar__link" to="#promotions">
              Promotions
            </NavLink>
            <NavLink exact activeClassName="active" className="navbar__link" to="#partners">
              Partners
            </NavLink>
            <NavLink exact activeClassName="active" className="navbar__link" to="//https://www.caesars.com/book">
              Book Now
            </NavLink>
            <NavLink activeClassName="active" className="navbar__link" to="/login" >
              Login
            </NavLink>
          </nav>
        </div>
        <div className="header-right">
        <img id="mytr_icon" className="user-icon-img" src="https://www.caesars.com/myrewards/profile/images/user-icon.svg" width="40" height="40" alt="User Icon" />
          <a className="active" href="#myaccount">My Account</a>
        </div>
      </div>
  );
};

export default Header;
