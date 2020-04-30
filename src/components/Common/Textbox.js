import React from 'react';

const Textbox = (props) => {
    const {defaultValue, textboxId} = props;
    const onBlur = (value) =>{
        if(props.onBlur) {
            props.onBlur(value);
        }
    }

    return(
        <div className="txt-wrap">
            <input 
                className="form-control txt" 
                type="text" 
                defaultValue = {defaultValue} 
                id={textboxId} 
                required 
                onBlur={onBlur} />
            <label className="form-control-placeholder" htmlFor={textboxId}>Enter Offer Code</label>
        </div>
    )
}

export default Textbox;