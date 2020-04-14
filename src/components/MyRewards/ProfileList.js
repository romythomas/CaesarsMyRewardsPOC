import React from 'react';
import TierScoreItem from './TierScoreItem'
import TierScoreDetailsItem from './TierScoreDetailsItem'
import RewardCreditItem from './RewardCreditItem'

const ProfileList = (props) => {
    return (
      <div className="list">
          {
              props.listValue.map(
                  (value, index)=> {return <TierScoreItem key={index} itemValue={value}/>}
              )
          }
      </div>
    );
}

export default ProfileList;