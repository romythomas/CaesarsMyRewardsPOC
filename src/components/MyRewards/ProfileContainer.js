import React from 'react';
import RewardCreditItem from './RewardCreditItem';
import TierScoreDetailsItem from './TierScoreDetailsItem';
import TierScoreItem from './TierScoreItem';

import OfferBlurbItem from './OfferBlurbItem';
import ReservationBlurbItem from './ReservationBlurbItem';
import PriceAlertBlurbItem from './PriceAlertBlurbItem';
import ProgressBarItem from './ProgressBarItem';

const ProfileContainer = (props) => {  
    return (
            <div className="container">                
                <div className="list">
                    <TierScoreItem logininfo={props.logininfo} />
                    <RewardCreditItem logininfo = {props.logininfo} feeds = {props.feeds} />
                    <TierScoreDetailsItem logininfo = {props.logininfo} feeds = {props.feeds} />
                </div>
                <div  className="list">
                    <ProgressBarItem logininfo={props.logininfo} />
                </div>   
                <div  className="list">
                    <OfferBlurbItem offerList={props.offerList} propertyList = {props.propertyList}/>
                    <ReservationBlurbItem logininfo={props.logininfo} />
                    <PriceAlertBlurbItem logininfo={props.logininfo} />
                </div> 
            </div>
    );
}

export default ProfileContainer;