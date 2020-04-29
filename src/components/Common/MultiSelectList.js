import React from 'react';

const loadScript = () => {
    $(document).on('click', '.filter-wrap', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(".filter-content").toggle();
    });
    $(document).on('click', '.close', function(e) {
		$(".filter-content").hide();
    });
    $(document).on('click', '.filter-content', function(e) {
        e.stopPropagation();       
    });
    $(document).on('click', 'body', function(e) {
		$('.filter-content').hide();
    });
}

const updateTextboxValue = (selectedValues) => {
    $(".filter").find(".filter-wrap").find("input:text").val(selectedValues.join(","));
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
            <div className="filter">
                <div className="filter-wrap">
                    <input className="form-control txt" type="text" id={selectId} defaultValue={selectedValues.join(",")} required />
                    <label className="form-control-placeholder" htmlFor={selectId}>{title}</label>
                </div>
                <div className="filter-content">
                    <a href="#" className="close"></a>
                    <div className="filter__list">
                        <ul>
                            <li>
                                {dataList.map((data, index) => {
                                    let isChecked = isDefaultValueAvailable ? defaultValue.includes(data) : false;
                                    return(
                                        <div key={index} className="filter__item">
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