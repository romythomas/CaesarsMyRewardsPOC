import React from 'react';

const TierScoreDetailsItem = (props) => { 
    let body = props.logininfo.tiers[0].description;
    return (       
        <div className="item rewardsitem">            
            <div className="credits" dangerouslySetInnerHTML={{__html: body}} />         
        </div>
    );
}

export default TierScoreDetailsItem;