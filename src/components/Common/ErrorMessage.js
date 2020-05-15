import React from 'react';

const ErrorMessage = (props) => {
    let {errorText, linkText, clearFilter} = props;
    errorText = errorText ? errorText : "Sorry!!! Please try again later."
    return (
        <div className="alert alert-danger" role="alert">
            {errorText} {" "}
            {
                linkText && linkText.length && clearFilter ?
                <a className="alert-link" onClick={clearFilter}>Clear Filters</a> : 
                ""
            } 
        </div>
    );
}

export default ErrorMessage;