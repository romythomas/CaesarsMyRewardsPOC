import React from 'react';

const Textbox = (props) => {
    const {defaultValue} = props;
    let {textboxId, title} = props;

    textboxId = textboxId ? textboxId : "txt-input";
    title = title ? title : "Enter text";
    const isDefaultValueAvailable = defaultValue && defaultValue.length;

    const closeButtonStyleToDisplay={
        display : isDefaultValueAvailable ? "block" : "none"
    }
    const componentContainerActiveClass = isDefaultValueAvailable ? "active" : "";
    
    const onChange = (value) =>{
        if(props.onChange) {
            const {target} = value;
            props.onChange(target && target.value ? target.value : "");
        }
    }

    const clearValue = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        if(props.onChange) {
            props.onChange("");
        }
    }

    return(
        <div className={`txt-wrap textComponent ${componentContainerActiveClass}`} >
            <input 
                className="form-control txt" 
                type="text" 
                value = {defaultValue} 
                id={textboxId} 
                onChange={onChange} />
            <label className="form-control-placeholder" htmlFor={textboxId}>{title}</label>
            <a className="close" style={closeButtonStyleToDisplay} href="#" onClick={clearValue}></a> 
        </div>
    )
}

export default Textbox;