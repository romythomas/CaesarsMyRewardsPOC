import React from 'react';
import {getTierName, getTierDetails} from '../../utilities/Helper'

const RewardCreditItem = (props) => {   
    var info = props.logininfo;
    var tierName = getTierName(props.logininfo.tier.code);
    var tier = getTierDetails(props.feeds.tiers, tierName);
    var imageUrl = "http://caesars.com/"+tier.cardImageUrl;

    var imageStyle = {        
        backgroundImage: 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(' + imageUrl + ')'
      };

    return (        
        <div className="item rewardsitem" style={imageStyle}>
            <div>
                <h3 className="upper no-margin">MY CURRENT REWARD CREDIT BALANCE</h3>
                <b>{info.rewardcredits.balance}</b>
                <p>Reward Credits</p>
                <p><b>Reward Credit balance expiration date: {info.rewardcredits.expirationdate}</b></p>
                <div><i>May not reflect most recent activity.</i></div>
            </div>
        </div>
    );
}
export default RewardCreditItem;