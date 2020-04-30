import React from 'react';

const loadScript = () => {
    $(document).ready(function(){
        $('.multiselect-wrap').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".multiselect-content").toggle();
        });
        $('.close').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".multiselect-content").hide();
        });
        $(document).on('click', '.multiselect-content', function(e) {
            e.stopPropagation();       
        });
        $(document).on('click', 'body', function(e) {
            $('.multiselect-content').hide();
        });
    });
}

const updateTextboxValue = (selectedValues) => {
    $(".multiselect").find(".multiselect-wrap").find("input:text").val(selectedValues.join(","));
}

const MultiSelectList = (props) => {
    const {title, dataList, selectId, defaultValue} = props;
    const isDefaultValueAvailable = defaultValue && defaultValue.length;
    let selectedValues = isDefaultValueAvailable ? defaultValue : [];
    const onChange = (value) =>{
        if(value && value.target && value.target.nextElementSibling && value.target.nextElementSibling.innerText) {
            if(value.target.checked) {
                selectedValues.push(value.target.nextElementSibling.innerText);
            } else {
                selectedValues = selectedValues.filter(item => item.toLowerCase() !== value.target.nextElementSibling.innerText.toLowerCase())
            }
            updateTextboxValue(selectedValues);
            if(props.onChange) {
                props.onChange(selectedValues);
            }
        }
    }
    if(dataList && dataList.length) {
        loadScript();
        return(
            <div className="multiselect">
                <div className="txt-wrap multiselect-wrap">
                    <input className="form-control txt" type="text" id={selectId} defaultValue={selectedValues.join(",")} required />
                    <label className="form-control-placeholder" htmlFor={selectId}>{title}</label>
                </div>
                <div className="multiselect-content">
                    <span className="close"></span>
                    <div className="multiselect__list">
                        <ul>
                            <li>
                                {dataList.map((data, index) => {
                                    let isChecked = isDefaultValueAvailable ? defaultValue.includes(data) : false;
                                    return(
                                        <div key={index} className="multiselect__item">
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
                </div>
            </div>
        )
    }
}

export default MultiSelectList;