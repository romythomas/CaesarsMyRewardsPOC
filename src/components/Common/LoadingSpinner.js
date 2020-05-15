import React from 'react';

const LoadingSpinner = (props) => {
    return (
        <div className="container-fluid">
            <div className="loading-spinner-container">
                <img className="loading-spinner" src="/images/loading-spinner.gif" alt="Loading"/>
            </div>
        </div>
    );
}

export default LoadingSpinner;