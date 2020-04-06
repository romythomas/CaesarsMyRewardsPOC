import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <a href="#default" className="logo">
        <img src="https://www.caesars.com/myrewards/profile/images/caesars_rewards_logo_white.png"></img>  
        </a>
        <div className="header-right">
          <a className="active" href="#home">Benefits</a>
          <a href="#earn">Earn &amp; Redeem</a>
          <a href="#promotions">Promotions</a>
          <a href="#partners">Partners</a>
          <a href="#booknow">Book Now</a>
        </div>
      </div>
    );
  }
}
export default Header;
