import React from 'react';
import {Link} from 'react-router-dom'

const SideNavigation = (props) => {  
    return (
        <aside className="sidebar">
            {/*TODO: Change ul-li to nav-navlink and handle active class */}
            <ul>
                <li className="item-nav"> 
                    <Link to="/myrewards"> <i className="icon__rewards"></i> <span>MY REWARDS</span> </Link> 
                </li>
                <li className="item-nav selected"> 
                    <Link to="/my-offers"> <i className="icon__offer"></i> <span>MY OFFERS</span> </Link> 
                </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__leaderboard"></i> <span>MY LEADERBOARD</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__quest"></i> <span>QUEST FOR REWARDS</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__profile"></i> <span>PROFILE</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__payment"></i> <span>PAYMENT OPTIONS</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__reservation"></i> <span>RESERVATIONS</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__price"></i> <span>PRICE ALERTS</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__win"></i> <span>WIN/LOSS STATEMENT</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__reward"></i> <span>REWARDS STATEMENT</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__casino"></i> <span>CASINO CREDIT</span> </Link> </li>
                <li className="item-nav"> <Link to="#"> <i className="icon__gift"></i> <span>GREAT GIFT WRAP UP</span> </Link> </li>
            </ul>
        </aside>
    );  
}

export default SideNavigation;