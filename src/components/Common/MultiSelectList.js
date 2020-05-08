import React from 'react';

const loadScript = () => {
    $(document).ready(function(){
        $('.multiselectlist-wrap').on('click touch', function(e) {
            e.preventDefault();
            $(".multiselectlist-wrap").toggleClass("active");
            $(".multiselectlist-content").toggle();
        });
        $('.multiselectlist-wrap .txt').keypress(function(e) {
            return false;
        });
        $('.multiselectlist-content .close').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".multiselectlist-wrap").removeClass("active");
            $(".multiselectlist-content").hide();
        });
        $(document).on('click', 'body', function(e) {
            if(e) {
                const {target} = e;
                const targetClassName = (target.className) ? "." + target.className : "";
                if(targetClassName !== "multiselectlist" && $(".multiselectlist").find(target).length <= 0) {
                    $(".multiselectlist-wrap").removeClass("active");
                    $('.multiselectlist-content').hide();
                }
            }
        });
    });
}

const updateCheckBoxUI = () => {
    $('.multiselectlist__item input:checkbox').prop('checked',false);
}

const updateTextboxValue = (selectedValues) => {
    const $textBoxElement = $(".multiselectlist").find(".multiselectlist-wrap").find("input:text");
    $textBoxElement.attr("value", selectedValues.join(","));
}

const MultiSelectList = (props) => {
    const {title, dataList, selectId, defaultValue} = props;
    const isDefaultValueAvailable = defaultValue && defaultValue.length;
    let selectedValues = isDefaultValueAvailable ? defaultValue : [];
    const onChange = (value) =>{
        if(value && value.target) {
            const {target} = value;
            if(target.nextElementSibling && target.nextElementSibling.innerText) {
                if(value.target.checked) {
                    selectedValues.push(value.target.nextElementSibling.innerText);
                } else {
                    selectedValues = selectedValues.filter(item => item.toLowerCase() !== value.target.nextElementSibling.innerText.toLowerCase())
                }
            } else {
                updateCheckBoxUI();
                selectedValues = [];
            }
            updateTextboxValue(selectedValues);
            if(props.onChange) {
                props.onChange(selectedValues);
            }
        }
        
    }
    if(dataList && dataList.length) {
        loadScript();
        //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
        return(
            <div className="multiselectlist">
                <div className="select-wrap multiselectlist-wrap">
                    <input className="form-control txt" type="text" id={selectId} value={selectedValues.join(",")} readOnly />
                    <label className="form-control-placeholder" htmlFor={selectId}>{title}</label>
                </div>
                <div className="multiselectlist-content">
                    <span className="close"></span>
                    <div className="multiselectlist__list">
                        <h2 className="title-pop-mobile" >{title}</h2>
                        <ul className="multiselectlist__listwrap">
                            <li className="multiselectlist__listitem">
                                {dataList.map((data, index) => {
                                    let isChecked = isDefaultValueAvailable ? defaultValue.includes(data) : false;
                                    return(
                                        <div key={index} className="multiselectlist__item">
                                            <input 
                                                id={selectId + "-chk-" + index} 
                                                onChange={onChange} 
                                                className="checkbox-custom" 
                                                name={selectId + "-chk-" + index} 
                                                defaultChecked={isChecked}
                                                type="checkbox" />
                                            <label 
                                                htmlFor={selectId + "-chk-" + index} 
                                                className="checkbox-custom-label">
                                                {data}
                                            </label>
                                        </div>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                    <div className="multiselectlist__btn">
                        <button className="button button--black-outline clear-selection" onClick={onChange} >Clear</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MultiSelectList;