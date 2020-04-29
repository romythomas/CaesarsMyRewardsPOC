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
    $(document).on('click', '.checkbox-custom', function(e) {
        $(".filter__count").text($('input[class="checkbox-custom"]:checked').length);
    });
}

const MultiSelectList = (props) => {
    const {title, dataList, checkBoxId, defaultValue} = props;
    const isDefaultValueAvailable = defaultValue && defaultValue.length;
    let selectedValues = isDefaultValueAvailable ? defaultValue : [];
    const onChange = (value) =>{
        if(value && value.target && value.target.nextElementSibling && value.target.nextElementSibling.innerText) {
            if(value.target.checked) {
                selectedValues.push(value.target.nextElementSibling.innerText);
            } else {
                selectedValues = selectedValues.filter(item => item.toLowerCase() !== value.target.nextElementSibling.innerText.toLowerCase())
            }
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
                    <span className="filter__text">{title}</span>
                    <span className="filter__count"></span>
                </div>
                <div className="filter-content">
                    <a href="#" className="close"></a>
                    <div className="filter__list">
                        <ul>
                            <li>
                                <h6>{title}</h6>
                                {dataList.map((data, index) => {
                                    let isChecked = isDefaultValueAvailable ? defaultValue.includes(data) : false;
                                    return(
                                        <div className="filter__item">
                                            <input 
                                                id={checkBoxId + "-" + index} 
                                                onChange={onChange} 
                                                className="checkbox-custom" 
                                                name={checkBoxId + "-" + index} 
                                                //checked={isChecked}
                                                type="checkbox" />
                                            <label 
                                                htmlFor={checkBoxId + "-" + index} 
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