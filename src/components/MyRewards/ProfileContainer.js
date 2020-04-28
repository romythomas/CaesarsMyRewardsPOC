import React from 'react';
import RewardCreditItem from './RewardCreditItem';
import TierScoreDetailsItem from './TierScoreDetailsItem';
import TierScoreItem from './TierScoreItem';
import { connect } from 'react-redux';
import OfferBlurbItem from './OfferBlurbItem';
import ReservationBlurbItem from './ReservationBlurbItem';
import PriceAlertBlurbItem from './PriceAlertBlurbItem';
import ProgressBarItem from './ProgressBarItem';

const mapStateToProps = state => ({
    logininfo: state.guestProfile.logininfo,
    feeds: state.guestProfile.feeds,
    offers: state.common.offers,
    properties: state.common.properties,
    reservations: state.common.reservations,
    enterpriseFeed: state.common.enterpriseFeed,
    priceAlert: state.common.priceAlert
  });

const ProfileContainer = (props) => {  
    return (
            <div>                
                <div className="content-box">
                    <div className="row">
                        <div className="col-md-4">
                            <RewardCreditItem /> 
                        </div>
                        <div className="col-md-4">
                            <TierScoreItem />
                        </div>
                        <div className="col-md-4">
                            <TierScoreDetailsItem />
                        </div>
                    </div>
                </div>
                
                <ProgressBarItem />
                  
                <div className="listing listing--reward">
                    <ul className="row">
                    <li className="col-md-4 col-sm-6">
                        <OfferBlurbItem />
                    </li>
                    <li className="col-md-4 col-sm-6">
                        <ReservationBlurbItem />
                    </li>
                    <li className="col-md-4 col-sm-6">
                        <PriceAlertBlurbItem />
                    </li>
                    </ul>
                </div> 
            </div>
    );
}

export default connect(mapStateToProps)(ProfileContainer);
