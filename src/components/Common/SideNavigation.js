import React from 'react';
import {NavLink} from 'react-router-dom'

const loadScript = () => {
    $(document).ready(function checkWidth() {
        if ($(window).width() <= 991) {  
          $(".sidebar__toggle").click(function(e) {
              e.preventDefault();
              $(this).toggleClass("open");
              $(".main").toggleClass("sidebar__active");
          });	
       } 
       $(window).resize(checkWidth);	
    });
}
const SideNavigation = (props) => {
    loadScript();
    return (
        <aside className="sidebar">
            <nav>                
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="/">
                        <i className="icon__rewards"></i> <span>MY REWARDS</span>
                    </NavLink>
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="/myoffers"> 
                        <i className="icon__offer"></i> <span>MY OFFERS</span>
                    </NavLink>
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__leaderboard"></i> <span>MY LEADERBOARD</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__quest"></i> <span>QUEST FOR REWARDS</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__profile"></i> <span>PROFILE</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__payment"></i> <span>PAYMENT OPTIONS</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__reservation"></i> <span>RESERVATIONS</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__price"></i> <span>PRICE ALERTS</span> 
                    </NavLink>
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__win"></i> <span>WIN/LOSS STATEMENT</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__reward"></i> <span>REWARDS STATEMENT</span> 
                    </NavLink>
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__casino"></i> <span>CASINO CREDIT</span> 
                    </NavLink> 
                </li>
                <li className="item-nav"> 
                    <NavLink exact activeClassName="selected" className="item-nav" to="#"> 
                        <i className="icon__gift"></i> <span>GREAT GIFT WRAP UP</span> 
                    </NavLink> 
                </li>
            </nav>
        </aside>
    );  
}

export default SideNavigation;