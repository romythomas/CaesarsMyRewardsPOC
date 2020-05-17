import React from "react";
import HeaderUserOverlay from "./HeaderUserOverlay";

class Header extends React.Component {
    constructor() {
        super();

        this.state = { installButton: null };

        this.installPrompt = null;

        this.installApp = async () => {
            if (!this.installPrompt) return false;
            // document.querySelector('.button-add-to-btn').style.display =  'none';
            this.installPrompt.prompt();
            let outcome = await this.installPrompt.userChoice;
            if (outcome.outcome == "accepted") {
                document.querySelector(".add-to").style.display = "none";
                console.log("App Installed");
            } else {
                console.log("App not installed");
            }
            // Remove the event reference
            this.installPrompt = null;
            // Hide the button
            this.setState({
                installButton: false
            });
        };
    }

    componentDidMount() {
        console.log("Listening for Install prompt inside header ");
        window.addEventListener("beforeinstallprompt", (e) => {
            console.log("beforeinstallprompt fired");
            // For older browsers
            e.preventDefault();
            console.log("Install Prompt fired ");
            this.installPrompt = e;
            // See if the app is already installed, in that case, do nothing
            if (
                (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
                window.navigator.standalone === true
            ) {
                console.log("window.matchMedia");
                return false;
            }
            // Set the state variable to make button visible
            this.setState({
                installButton: true
            });
            console.log("Install state is ", this.state.installButton);
        });
    }

    render() {
        const { loginInfo } = this.props;
        return (
            <header className="header fixed-top">
                <div className="logo">
                    <div id="sidebar_menu" className="sidebar__toggle">
                        <span className="bar1"></span>
                        <span className="bar2"></span> <span className="bar3"></span>{" "}
                    </div>
                    <a>
                        <img src="/images/logo.png" alt="Caesars Entertainment Logo" />
                    </a>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active" href="https://www.caesars.com/myrewards/benefits-overview">
                                BENEFITS<span className="sr-only">(current)</span>
                            </a>
                            <a className="nav-item nav-link" href="https://www.caesars.com/myrewards/earn-and-redeem">
                                EARN & REDEEM
                            </a>
                            <a className="nav-item nav-link" href="https://www.caesars.com/myrewards/promotions">
                                PROMOTIONS
                            </a>
                            <a className="nav-item nav-link" href="https://www.caesars.com/myrewards/partners">
                                PARTNERS
                            </a>
                            <a className="nav-item nav-link" href="https://www.caesars.com/book">
                                BOOK NOW
                            </a>
                        </div>
                    </div>
                </nav>
                <ul className="top-menu">
                    <li className="user">
                        <HeaderUserOverlay userData={loginInfo} />
                    </li>
                </ul>
                <div className="add-to">
                    <button className="button" onClick={this.installApp}>
                        Add to home screen
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
