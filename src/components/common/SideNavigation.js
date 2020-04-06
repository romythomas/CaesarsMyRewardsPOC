import React from 'react';
import { Link } from 'react-router-dom';

class SideNavigation extends React.Component {
  render() {
    return (
        <nav id="side-navigation">
            <div>
                <ul>
                    <li className="my-total-rewards active"><a href="#myrewards">My Rewards</a></li>
                    <li className="my-offers"><a href="#my-offers">My Offers</a></li>
                    <li className="leaderboard"><a href="#leaderboard">My Leaderboard</a></li>
                    <li className="badges"><a href="/myrewards/profile/badges">Quest For Rewards</a></li>
                    <li className="challenges"><a href="/myrewards/profile/challenges">My Challenges</a></li>
                    <li className="profile"><a href="#view-profile">Profile</a></li>
                    <li className="payment"><a href="#payment">Payment Options</a></li>
                    <li className="reservations"><a href="#reservations">Reservations</a></li>
                    <li className="price-alerts"><a href="#price-alerts">Price Alerts</a></li>
                    <li className="winloss"><a href="#winloss">Win/Loss Statement</a></li>
                    <li className="trstatement"><a href="#trstatement">Rewards Statement</a></li>
                </ul>
            </div>
        </nav>
    );
  }
}

export default SideNavigation;