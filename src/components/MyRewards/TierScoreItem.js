import React from 'react';

const TierScoreItem = (props) => { 
    const { logininfo } =props;
    return (        
        <div className="item rewardsitem">
            <h3>MY CURRENT TIER</h3>
            <div className="tier upper">{logininfo.tier.code}</div>            
            <div className="score-label">MY TIER SCORE</div>
            <div className="score">{logininfo.tier.tierscore}</div>
            <div className="score-exp">Resets annually on January 1st </div>
        </div>
    );
}

export default TierScoreItem;