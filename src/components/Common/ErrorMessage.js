import React from "react";
import { recordErrorData } from "../../utilities/Gtm-Module";
import { GLOBAL_ERROR } from "../../constants/errorMessages";

const ErrorMessage = (props) => {
    let { errorText, linkText, clearFilter } = props;
    errorText = errorText ? errorText : GLOBAL_ERROR;

    //DataLayer logging
    if (errorText) {
        recordErrorData(errorText);
    }

    return (
        <div className="alert alert-danger" role="alert">
            {errorText}{" "}
            {linkText && clearFilter ? (
                <a className="alert-link" onClick={clearFilter}>
                    {linkText}
                </a>
            ) : (
                ""
            )}
        </div>
    );
};

export default ErrorMessage;
