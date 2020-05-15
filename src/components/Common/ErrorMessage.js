import React, {useEffect} from 'react';
import {recordErrorData} from '../../utilities/Gtm-Module';

const ErrorMessage = (props) => {
    let {errorText, linkText, clearFilter} = props;
    errorText = errorText ? errorText : "Sorry!!! Please try again later."

    useEffect(() => {
        //DataLayer
        try {
            recordErrorData(errorText);
        } catch (err) {
            //ignore datalayer error
        }
    }, []);

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