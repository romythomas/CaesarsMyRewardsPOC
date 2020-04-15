import React from 'react';

const RewardCreditItem = (props) => { 
    const { logininfo } =props.logininfo;
    const { feeds } = props.logininfo;
    return (        
        <div className="item rewardsitem image">
            <div>
                <h3 className="upper no-margin">MY CURRENT REWARD CREDIT BALANCE</h3>
                <b>{logininfo.rewardcredits.balance}</b>
                <p>Reward Credits</p>
                <p><b>Reward Credit balance expiration date: {logininfo.rewardcredits.expirationdate}</b></p>
                <div><i>May not reflect most recent activity.</i></div>
            </div>
        </div>
    );
}
export default RewardCreditItem;