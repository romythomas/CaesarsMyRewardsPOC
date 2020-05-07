import React from 'react';
import { connect } from 'react-redux';

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = state => ({
  logininfo: state.guestProfile.logininfo
});

/**
 * 
 * @param {*} props 
 */
const ProgressBarItem = (props) => { 
    return (
      <div className="reward-progress">
        <div className="progressbar"></div>
        <ul>
          <li>
            <div className="progress-icon">
              <img src="images/icon-gold.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <samp>0</samp>
              <strong>5000</strong>
              <span>Gold</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/icon-platinum.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <strong>15000</strong>
              <span>Platinum</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/icon-diomond.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <strong>25000</strong>
              <span>Diomond</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/icon-gold.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <span>Seven Star</span>
            </div>
          </li>
        </ul>
      </div>
    );
}

export default connect(mapStateToProps)(ProgressBarItem);
