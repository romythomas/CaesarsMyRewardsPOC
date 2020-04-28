import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  logininfo: state.guestProfile.logininfo
});

const ProgressBarItem = (props) => { 
    return (        
        <div className="reward-progress">
        <ul>
          <li>
              <div className="progress-icon"><img src="images/icon-gold.png" alt="Caesars"/></div>
            <div className="progress-text">
              <span>Gold</span>
            </div></li>
          <li>
            <div className="progress-icon"><img src="images/icon-platinum.png" alt="Caesars"/></div>
            <div className="progress-text">
              <strong>5000</strong>
              <span>Platinum</span>
            </div>
          </li>
          <li>
              <div className="progress-icon"><img src="images/icon-diomond.png" alt="Caesars"/></div>
              <div className="progress-text">
                <strong>15000</strong>
                <span>Diomond</span>
              </div>
            </li>
        </ul>
      </div>
    );
}

export default connect(mapStateToProps)(ProgressBarItem);
