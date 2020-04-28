import React from 'react';
import {getTierName, getTierDetails} from '../../utilities/Helper'

const TierScoreDetailsItem = (props) => { 
    var tierName = getTierName(props.logininfo.tier.code);
    var tier = getTierDetails(props.feeds.tiers, tierName);
    return (       
        <div className="rewards__benifits">          
            <div dangerouslySetInnerHTML={{__html: tier.description}} />         
        </div>
    );
}

export default TierScoreDetailsItem;