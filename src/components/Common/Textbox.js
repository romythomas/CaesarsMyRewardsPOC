import React from 'react';

const Textbox = (props) => {
    const {defaultValue, textboxId, title} = props;

    const onChange = (value) =>{
        const {target} = value;
        const $textboxComponent = $(".textComponent");
        const $close = $(".textComponent .close");
        if(target && target.value && target.value.length > 0) {
            $textboxComponent.addClass("active");
            $close.css("display", "block");
        } else {
            $textboxComponent.removeClass("active");
            $close.css("display", "none");
        }
        if(props.onChange) {
            props.onChange(target.value);
        }
    }

    const clearValue = (e) =>{
        $(".textComponent").removeClass("active");
        $(".textComponent .close").css("display", "none");
        $('.textComponent input[type="text"]').val("");
        e.preventDefault();
        e.stopPropagation();
        if(props.onChange) {
            props.onChange("");
        }
    }

    return(
        <div className="txt-wrap textComponent">
            <input 
                className="form-control txt" 
                type="text" 
                defaultValue = {defaultValue} 
                id={textboxId} 
                onChange={onChange} />
            <label className="form-control-placeholder" htmlFor={textboxId}>{title}</label>
            <a className="close" href="#" onClick={clearValue}></a> 
        </div>
    )
}

export default Textbox;