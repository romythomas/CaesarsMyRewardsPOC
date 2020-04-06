import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          Test{appName}
        </h1>
        <p></p>
      </div>
    </div>
  );
};

export default Banner;
