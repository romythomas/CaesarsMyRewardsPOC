import React from 'react';
import {getTierName, getTierDetails} from '../../utilities/Helper'
  
/**
 * 
 * @param {*} props 
 */
const TierScoreDetailsItem = (props) => { 
    let tierName = getTierName(props.logininfo.tier.code);
    let tier = getTierDetails(props.feeds.tiers, tierName);
    return (       
        <div className="rewards__benifits">          
            <div dangerouslySetInnerHTML={{__html: tier.description}} />         
        </div>
    );
}

export default (TierScoreDetailsItem);
