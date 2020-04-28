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
        // <div className="item rewardsitem" style={imageStyle}>
        <div className="rewards__box">           
            MY CURRENT REWARD CREDIT BALANCE
            <strong>{info.rewardcredits.balance}</strong>
            Reward Credit balance expiration date: {info.rewardcredits.expirationdate}
            &nbsp;May not reflect most recent activity.            
        </div>
    );
}
export default RewardCreditItem;