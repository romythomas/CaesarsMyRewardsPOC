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
                    <ReservationBlurbItem reservationList ={props.reservationList} propertyList = {props.propertyList}/>
                    <PriceAlertBlurbItem priceList={props.priceList} enterpriseList={props.enterpriseList}
                                        propertyList = {props.propertyList} />
                </div> 
            </div>
    );
}

export default ProfileContainer;