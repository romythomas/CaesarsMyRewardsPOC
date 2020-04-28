import React from 'react';
import {getTierName} from '../../utilities/Helper'

const TierScoreItem = (props) => {     
    const { logininfo } =props;
    
    return (        
        <div className="rewards__card">
             <img src="images/icon-dollar.png" alt="Caesars"/>
            MY CURRENT TIER
            <strong>{getTierName(logininfo.tier.code)}</strong>            
            MY TIER SCORE
            <strong>{logininfo.tier.tierscore}</strong>
            Resets annually on January 1st
        </div>
    );
}
export default TierScoreItem;