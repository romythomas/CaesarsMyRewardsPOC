import React from 'react';
import ProfileList from './ProfileList'

const tierListArray = [[1,2,3]];

const ProfileContainer = () => {  
    return (
      <div className="container">
          {
              tierListArray.map(
                  (value, index)=> {return <ProfileList key={index} listValue={value}/>}
              )
          }
      </div>
    );
}

export default ProfileContainer;