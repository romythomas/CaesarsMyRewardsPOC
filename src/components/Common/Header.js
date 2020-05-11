import React from 'react';
import {getTierName} from '../../utilities/Helper'

const loadScript = () => {
  $(document).ready(function() {
    $(".userImage, .username").off('click touch').on('click touch',function (e){
      e.preventDefault();
      $(".user-panel").toggle();
    });
    $(".close").off('click touch').on('click touch', function(e){
      e.preventDefault();
      $(".user-panel").hide();
    });
    $(document).on('click','body', function(e){
      if(e){
        const {target} = e;
        const classlist = target.classList;
        if(!classlist.contains('user') && $('.user').find(target).length <= 0)
        {
            $('.user-panel').hide();
        }
      }
    });
  });
}
const Header = (props) => {
  const {loginInfo} = props;
  loadScript();
  return (
    <header className="header fixed-top">
      <div className="logo">
        <div id="sidebar_menu" className="sidebar__toggle">
          <span className="bar1"></span>
          <span className="bar2"></span> <span className="bar3"></span>{" "}
        </div>
        <a>
          <img src="/images/logo.png" alt="Caesars Entertainment Logo" />
        </a>
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active"
              href="https://www.caesars.com/myrewards/benefits-overview"
            >
              BENEFITS<span className="sr-only">(current)</span>
            </a>
            <a
              className="nav-item nav-link"
              href="https://www.caesars.com/myrewards/earn-and-redeem"
            >
              EARN & REDEEM
            </a>
            <a
              className="nav-item nav-link"
              href="https://www.caesars.com/myrewards/promotions"
            >
              PROMOTIONS
            </a>
            <a
              className="nav-item nav-link"
              href="https://www.caesars.com/myrewards/partners"
            >
              PARTNERS
            </a>
            <a
              className="nav-item nav-link"
              href="https://www.caesars.com/book"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </nav>
      <ul className="top-menu">
        <li className="user">
          <span className="userImage"></span>
          <span className="username">Hello, {loginInfo.firstname}</span>
          <div className="user-panel">
            <div className="user-panel__logo">
              <a>
                <img src="/images/caesars-rewards-logo.png" alt="user" />
              </a>
            </div>
            <div className="user-panel__name">
              Hello, <strong>{loginInfo.username}</strong>
            </div>
            <div className="user-panel__credits">
              <strong>{loginInfo.tierscore}</strong>
              <span>Tier Credit</span>
            </div>
            <ul className="user-panel__item">
              <li>
                <span>Tier Staus</span>
                <strong>{getTierName(loginInfo.tier)}</strong>
              </li>
              <li>
                <span>Rewards Credit</span>
                  <strong>{loginInfo.accountbalance}</strong>
              </li>
              <li>
                <span>Rewards #</span>
                <strong>{loginInfo.accountid}</strong>
              </li>
            </ul>
            <div className="btn-wrap">
              <button className="button button-outline">Sign Out</button>
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
