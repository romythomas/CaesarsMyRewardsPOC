import React from 'react';
import {Link} from 'react-router-dom'

const SideNavigation = (props) => {  
    return (
        <nav id="side-navigation">
            <div>
                <ul>
                    <li className="my-total-rewards"><Link to="/myrewards">My Rewards</Link></li>
                    <li className="my-offers"><Link to="/my-offers">My Offers</Link></li>
                    <li className="leaderboard"><Link to="/leaderboard">My Leaderboard</Link></li>
                    <li className="badges"><Link to="/badges">Quest For Rewards</Link></li>
                    <li className="challenges"><Link to="/challenges">My Challenges</Link></li>
                    <li className="profile"><Link to="/view-profile">Profile</Link></li>
                    <li className="payment"><Link to="/payment">Payment Options</Link></li>
                    <li className="reservations"><Link to="/reservations">Reservations</Link></li>
                    <li className="price-alerts"><Link to="/price-alerts">Price Alerts</Link></li>
                    <li className="winloss"><Link to="/winloss">Win/Loss Statement</Link></li>
                    <li className="trstatement"><Link to="/trstatement">Rewards Statement</Link></li>
                </ul>
            </div>
        </nav>
    );  
}

export default SideNavigation;