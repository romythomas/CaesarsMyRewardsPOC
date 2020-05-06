import React from 'react';
import { connect } from 'react-redux';

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = state => ({
  logininfo: state.guestProfile.logininfo
});

const mystyle = {
  backgroundColor: "#ad9692",
  background: "-webkit-linear-gradient(top, #ad9692, #ad9692)"
};

/**
 * 
 * @param {*} props 
 */
const ProgressBarItem = (props) => { 
    return (        
        <div className="reward-progress">
        <ul>
          <li style={mystyle}>
            <div className="progress-icon"><img src="images/icon-gold.png" alt="Caesars"/></div>
            <div className="progress-text">
              <span>Gold</span>
            </div>
          </li>
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
          <li>
            <div className="progress-icon"><img src="images/icon-gold.png" alt="Caesars"/></div>
            <div className="progress-text">
              <strong>25000</strong>
              <span>Seven Star</span>
            </div>
          </li>
        </ul>
      </div>
    );
}

export default connect(mapStateToProps)(ProgressBarItem);
