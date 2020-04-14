import React from 'react';

const RewardCreditItem = (props) => { 
    return (        
        <div className="item">
            <h3 className="upper no-margin">MY CURRENT REWARD CREDIT BALANCE</h3>
            <div className="credits">1,165</div>
            <label>Reward Credits</label>
            <div className="rcExpiration"><b>Reward Credit balance expiration date: 09/03/2020</b></div>
            <div><i>May not reflect most recent activity.</i></div>
        </div>
    );
}
export default RewardCreditItem;