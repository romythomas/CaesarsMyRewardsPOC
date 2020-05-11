import React from "react";
import { getTierName } from "../../utilities/Helper";

const loadScript = () => {
  $(document).ready(function () {
    $(".userImage, .username")
      .off("click touch")
      .on("click touch", function (e) {
        e.preventDefault();
        $(".user-panel").toggle();
      });
    $(".close")
      .off("click touch")
      .on("click touch", function (e) {
        e.preventDefault();
        $(".user-panel").hide();
      });
    $(document).on("click", "body", function (e) {
      if (e) {
        const { target } = e;
        const classlist = target.classList;
        if (
          !classlist.contains("user") &&
          $(".user").find(target).length <= 0
        ) {
          $(".user-panel").hide();
        }
      }
    });
  });
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = { installButton: null };

    this.installPrompt = null;

    this.installApp = async () => {
      if (!this.installPrompt) return false;
      document.querySelector('.add-to').style.display =  'none';
      this.installPrompt.prompt();
      let outcome = await this.installPrompt.userChoice;
      if (outcome.outcome == "accepted") {
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
    window.addEventListener("load", () => {
      document.querySelector('.add-to').style.display =  'none';
      
      if (navigator.standalone) {
        console.log("Launched: Installed (iOS)");
      } else if (matchMedia("(display-mode: standalone)").matches) {
        console.log("Launched: Installed");
      } else {
        console.log("Launched: Browser Tab");
      }
    });

    window.addEventListener("beforeinstallprompt", (e) => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired ");
      this.installPrompt = e;
      document.querySelector('.add-to').style.display =  'block';
      // See if the app is already installed, in that case, do nothing
      if (
        (window.matchMedia &&
          window.matchMedia("(display-mode: standalone)").matches) ||
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
    loadScript();
    return (
      <header className="header fixed-top">
        <div className="logo">
          <div id="sidebar_menu" className="sidebar__toggle">
            <span className="bar1"></span>
            <span className="bar2"></span> <span className="bar3"></span>{" "}
          </div>
          <a href="#">
            <img src="../images/logo.png" alt="Caesars Entertainment Logo" />
          </a>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className="nav-item nav-link active"
                href="https://www.caesars.com/myrewards/benefits-overview"
              >
                BENEFITS<span className="sr-only">(current)</span>
              </a>
              <a
                className="nav-item nav-link"
                href="https://www.caesars.com/myrewards/earn-and-redeem"
              >
                EARN & REDEEM
              </a>
              <a
                className="nav-item nav-link"
                href="https://www.caesars.com/myrewards/promotions"
              >
                PROMOTIONS
              </a>
              <a
                className="nav-item nav-link"
                href="https://www.caesars.com/myrewards/partners"
              >
                PARTNERS
              </a>
              <a
                className="nav-item nav-link"
                href="https://www.caesars.com/book"
              >
                BOOK NOW
              </a>
            </div>
          </div>
        </nav>
        <ul className="top-menu">
          <li className="user">
            <span className="userImage"></span>
            <span className="username">Hello, {loginInfo.firstname}</span>
            <div className="user-panel">
              <div className="user-panel__logo">
                <a href="#">
                  <img src="images/caesars-rewards-logo.png" alt="user" />
                </a>
              </div>
              <div className="user-panel__name">
                Hello, <strong>{loginInfo.username}</strong>
              </div>
              <div className="user-panel__credits">
                <strong>{loginInfo.tierscore}</strong>
                <span>Tier Credit</span>
              </div>
              <ul className="user-panel__item">
                <li>
                  <span>Tier Staus</span>
                  <strong>{getTierName(loginInfo.tier)}</strong>
                </li>
                <li>
                  <span>Rewards Credit</span>
                  <strong>{loginInfo.accountbalance}</strong>
                </li>
                <li>
                  <span>Rewards #</span>
                  <strong>{loginInfo.accountid}</strong>
                </li>
              </ul>
              <div className="btn-wrap">
                <button className="button button-outline">Sign Out</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="add-to">
        <button class="add-to-btn" onClick={this.installApp}>
          Add to home screen
        </button>
        </div>
      </header>
    );
  }
}

export default Header;
