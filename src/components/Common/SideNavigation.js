import React from 'react';
import {NavLink} from 'react-router-dom'

const loadScript = () => {
    $(document).ready(function checkWidth() {
        if ($(window).width() <= 991) {  
            $(".sidebar__toggle").unbind().click(function(e) {
                $(this).toggleClass("open");
                $(".main").toggleClass("sidebar__active");
            });
            //scroll top
            const $scrollButton = $(".scroll-top");
            $(window).scroll(function(){            
                if($(this).scrollTop()>500) {
                    $scrollButton.fadeIn("slow");
                } else {
                    $scrollButton.fadeOut("slow");
                };
            });
            $scrollButton.unbind().click(function(){
                $("html, body").animate({scrollTop: 0}, 800);
                return false;
            });
        } 
        $(window).resize(checkWidth);
    });
    $(document).ready(function(){
        var allPanels = $('.nav-drop').hide();   
        $('.item-nav > a').unbind().click(function() {
            allPanels.slideUp();
            $(this).next().slideDown();
            $(".sidebar__toggle").toggleClass("open");
            $(".main").toggleClass("sidebar__active");
        });
        
    });
}
const SideNavigation = (props) => {
    loadScript();
    return (
        <aside className="sidebar">
            <ul className="list-group"  id="sidebar">
                <li className="list-group-item">
                    <a href="#menu1"  data-toggle="collapse" data-parent="#sidebar" className="main-head open">
                        <span className="hidden-sm-down">My Rewards</span> 
                    </a>
                <div className="collapse show main-sub" id="menu1">
                    <nav>
                        <li className="item-nav"> 
                            <NavLink activeClassName="selected" to="/myrewards">
                                <i className="icon__rewards"></i> <span className="hidden-sm-down">MY REWARDS</span>
                            </NavLink>
                        </li>
                        <li className="item-nav"> 
                            <NavLink activeClassName="selected" to="/myoffers"> 
                                <i className="icon__offer"></i> <span className="hidden-sm-down">MY OFFERS</span>
                            </NavLink>
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__leaderboard"></i> <span className="hidden-sm-down">MY LEADERBOARD</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__quest"></i> <span className="hidden-sm-down">QUEST FOR REWARDS</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__profile"></i> <span className="hidden-sm-down">PROFILE</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__payment"></i> <span className="hidden-sm-down">PAYMENT OPTIONS</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected"to="#"> 
                                <i className="icon__reservation"></i> <span className="hidden-sm-down">RESERVATIONS</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__price"></i> <span className="hidden-sm-down">PRICE ALERTS</span> 
                            </NavLink>
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__win"></i> <span className="hidden-sm-down">WIN/LOSS STATEMENT</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__reward"></i> <span className="hidden-sm-down">REWARDS STATEMENT</span> 
                            </NavLink>
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected" to="#"> 
                                <i className="icon__casino"></i> <span className="hidden-sm-down">CASINO CREDIT</span> 
                            </NavLink> 
                        </li>
                        <li className="item-nav"> 
                            <NavLink exact activeClassName="selected"to="#"> 
                                <i className="icon__gift"></i> <span className="hidden-sm-down">GREAT GIFT WRAP UP</span> 
                            </NavLink> 
                        </li>
                    </nav>
                </div>
                </li>
            </ul>
            <ul className="nav-mobbile">
                <li className="list-group-item">
                    <a href="https://www.caesars.com/myrewards/benefits-overview"> <i className="icon__benifits"></i> <span>Benifits</span> </a> 
                </li>
                <li className="list-group-item">
                    <a href="https://www.caesars.com/myrewards/earn-and-redeem"> <i className="icon__earn"></i> <span>Earn & Redeem</span> </a> 
                </li>
                <li className="list-group-item">
                    <a href="https://www.caesars.com/myrewards/promotions"> <i className="icon__promotion"></i> <span>Promotions</span> </a> 
                </li>
                <li className="list-group-item">
                    <a href="https://www.caesars.com/myrewards/partners"> <i className="icon__partner"></i> <span>Partners</span> </a> 
                </li>
                <li className="list-group-item">
                    <a href="https://www.caesars.com/book"> <i className="icon__book"></i> <span>Book Now</span> </a> 
                </li>
            </ul>
        </aside>
    );  
}
export default SideNavigation;