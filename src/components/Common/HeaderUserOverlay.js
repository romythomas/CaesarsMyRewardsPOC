import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { getTierName } from "../../utilities/Helper";

const HeaderUserOverlay = (props) => {
    if (props && props.userData) {
        const { firstname, username, tierscore, tier, accountbalance, accountid } = props.userData;
        const [isActiveState, setIsActiveState] = useState(false);

        const onSpanClick = () => {
            setIsActiveState((isActiveState) => !isActiveState);
        };

        const onClose = () => {
            setIsActiveState((isActiveState) => false);
        };

        return (
            <ClickAwayListener onClickAway={onClose}>
                <div>
                    <span className="userImage" onClick={onSpanClick}></span>
                    <span className="username" onClick={onSpanClick}>
                        Hello, {firstname}
                    </span>
                    <div className={`user-panel ${isActiveState ? "open" : ""}`}>
                        <span className="close" onClick={onClose}></span>
                        <div className="user-panel__logo">
                            <a>
                                <img src="/images/caesars-rewards-logo.png" alt="user" />
                            </a>
                        </div>
                        <div className="user-panel__name">
                            Hello, <strong>{username}</strong>
                        </div>
                        <div className="user-panel__credits">
                            <strong>{tierscore}</strong>
                            <span>Tier Credit</span>
                        </div>
                        <ul className="user-panel__item">
                            <li>
                                <span>Tier Staus</span>
                                <strong>{getTierName(tier)}</strong>
                            </li>
                            <li>
                                <span>Rewards Credit</span>
                                <strong>{accountbalance}</strong>
                            </li>
                            <li>
                                <span>Rewards #</span>
                                <strong>{accountid}</strong>
                            </li>
                        </ul>
                        <div className="btn-wrap">
                            <button className="button button-outline">Sign Out</button>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        );
    } else {
        return null;
    }
};

export default HeaderUserOverlay;
