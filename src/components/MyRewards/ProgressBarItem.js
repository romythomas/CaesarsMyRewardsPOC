import React from 'react';
import {getTierName} from '../../utilities/Helper'
 
/**
 * 
 * @param {*} props 
 */
const ProgressBarItem = (props) => {
  const { feeds, logininfo } = props;
  let progressBarMessage = '';
  let creditsNeeded = '';
  let tierText = '';
  let progressbarpercent = '0%';
  let inlineStyle = '';
  let score = '';

  if (feeds && logininfo) {
    let tierCode = logininfo.tier.code;
    let tierName = getTierName(tierCode);

    //find user's score bracket
    let tierscore = logininfo.tier.tierscore;
    if (tierscore == -1 || tierscore == "-1") {
      tierscore = 0;
    }
    score = parseInt(tierscore);
    let tempScore = score;
    let userbracket = feeds.brackets.find((t) => tempScore < parseInt(t.score));

    //find GOLD tier from userbracket
    let userbrackettier = userbracket.tiers.find((t) => t.tier === tierName);

    //find marker template
    let template = feeds.markertemplates[userbrackettier.markerTemplate];
    progressbarpercent = `${((score - template.progressbarOrigin) / template.progressbarDivisor) * 100}%`;
    creditsNeeded = 4000 - score;
    progressBarMessage = userbrackettier.progressBarMessage;
    tierText = userbrackettier.tierText;

    const desktopStyle={
      width : progressbarpercent
    }
    const mobileStyle={
      height : progressbarpercent
    }
    inlineStyle = (window.innerWidth > 767)? desktopStyle: mobileStyle;
  }

  return (
    <div className="reward-progress-wrap">
      <span className="info">
        <strong>{creditsNeeded}</strong> {progressBarMessage}&nbsp;{tierText}
      </span>
      <div className="reward-progress">
        <div
          className="progressbar"
          style={inlineStyle}>
            <span>{score}</span>
          </div>
        <ul>
          <li>
            <div className="progress-icon">
              <img src="images/icon-gold.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <samp>0</samp>
              <strong>4000</strong>
              <span>Gold</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/icon-platinum.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <strong>13000</strong>
              <span>Platinum</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/icon-diomond.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <strong>25000</strong>
              <span>Diamond</span>
            </div>
          </li>
          <li>
            <div className="progress-icon">
              <img src="images/star.png" alt="Caesars" />
            </div>
            <div className="progress-text">
              <span>Seven Star</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressBarItem;
