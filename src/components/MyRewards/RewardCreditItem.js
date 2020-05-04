import React from 'react';
  
/**
 * 
 * @param {*} props 
 */
const RewardCreditItem = (props) => {   
    const {logininfo} = props;

    return (        
        <div className="rewards__box">           
            MY CURRENT REWARD CREDIT BALANCE
            <strong>{logininfo.rewardcredits.balance}</strong>
            Reward Credit balance expiration date: {logininfo.rewardcredits.expirationdate}
            &nbsp;May not reflect most recent activity.            
        </div>
    );
}
export default (RewardCreditItem);
