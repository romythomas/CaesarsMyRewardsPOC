import React from 'react';

const TierScoreItem = (props) => { 
    return (        
        <div class="item">
            <h3>MY CURRENT TIER</h3>
            <div class="tier upper">GOLD</div>            
            <div class="score-label">MY TIER SCORE</div>
            <div class="score">153</div>
            <div class="score-exp">Resets annually on January 1st</div>
        </div>
    );
}

export default TierScoreItem;