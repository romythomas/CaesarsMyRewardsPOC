import React from 'react';

const Textbox = (props) => {
    const {defaultValue, textboxId, title} = props;

    const closeButtonStyleToDisplay={
        display : (defaultValue && defaultValue.length) ? "block" : "none"
      }

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
        $('.textComponent input[type="text"]').attr("value", "");
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
                value = {defaultValue} 
                id={textboxId} 
                onChange={onChange} />
            <label className="form-control-placeholder" htmlFor={textboxId}>{title}</label>
            <a className="close" style={closeButtonStyleToDisplay} href="#" onClick={clearValue}></a> 
        </div>
    )
}

export default Textbox;