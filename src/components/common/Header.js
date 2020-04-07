import React from 'react';

const Header = (props) => {
  return (
    <div className="header">
        <a href="#default" className="logo">
        <img src="https://www.caesars.com/myrewards/profile/images/caesars_rewards_logo_white.png"></img>  
        </a>
        <div className="header-left">
          <a className="active" href="#home">Benefits</a>
          <a href="#earn">Earn &amp; Redeem</a>
          <a href="#promotions">Promotions</a>
          <a href="#partners">Partners</a>
          <a href="#booknow">Book Now</a>
        </div>
        <div className="header-right">
        <img id="mytr_icon" className="user-icon-img" src="https://www.caesars.com/myrewards/profile/images/user-icon.svg" width="40" height="40" alt="User Icon" />
          <a className="active" href="#myaccount">My Account</a>
        </div>
      </div>
  );
};

export default Header;
