import React from 'react';
import RewardCreditItem from './RewardCreditItem';
import TierScoreDetailsItem from './TierScoreDetailsItem';
import TierScoreItem from './TierScoreItem';

import OfferBlurbItem from './OfferBlurbItem';
import ReservationBlurbItem from './ReservationBlurbItem';
import PriceAlertBlurbItem from './PriceAlertBlurbItem';

import ProgressBarItem from './ProgressBarItem';


const ProfileContainer = (props) => {  
    console.log("profile container");
    console.log(props.feeds)
    return (
        
            <div className="container">                
                <div className="list">
                    <TierScoreItem logininfo={props.logininfo} />
                    <RewardCreditItem logininfo={props} />
                    <TierScoreDetailsItem logininfo={props.feeds} />
                </div>
                <div  className="list">
                    <ProgressBarItem logininfo={props.logininfo} />
                </div>   
                <div  className="list">
                    <OfferBlurbItem logininfo={props.logininfo} />
                    <ReservationBlurbItem logininfo={props.logininfo} />
                    <PriceAlertBlurbItem logininfo={props.logininfo} />
                </div> 
            </div>
       
    );
}

export default ProfileContainer;