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
            <div>                
                <div className="content-box">
                    <div className="row">
                        <div className="col-md-4">
                            <RewardCreditItem logininfo = {props.logininfo} feeds = {props.feeds} />
                        </div>
                        <div className="col-md-4">
                            <TierScoreItem logininfo={props.logininfo} />
                        </div>
                        <div className="col-md-4">
                            <TierScoreDetailsItem logininfo = {props.logininfo} feeds = {props.feeds} />
                        </div>
                    </div>
                </div>
                
                <ProgressBarItem logininfo={props.logininfo} />
                  
                <div className="listing listing--reward">
                    <ul className="row">
                    <li className="col-md-4 col-sm-6">
                        <OfferBlurbItem offerList={props.offerList} propertyList = {props.propertyList}/>
                    </li>
                    <li className="col-md-4 col-sm-6">
                        <ReservationBlurbItem reservationList ={props.reservationList} propertyList = {props.propertyList}/>
                    </li>
                    <li className="col-md-4 col-sm-6">
                        <PriceAlertBlurbItem priceList={props.priceList} enterpriseList={props.enterpriseList}
                                            propertyList = {props.propertyList} />
                    </li>
                    </ul>
                </div> 
            </div>
    );
}

export default ProfileContainer;