import React from 'react';

const loadScript = () => {
    $(document).ready(function(){
        $('.multiselectlist-wrap').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".multiselectlist-wrap").toggleClass("active");
            $(".multiselectlist-content").toggle();
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

const MultiSelectList = (props) => {
    const {dataList, defaultValue} = props;
    let {title, selectId} = props;
    title = title ? title : "Select Filters";
    selectId = selectId ? selectId : "chk-filter"
    const isDefaultValueAvailable = defaultValue && defaultValue.length;
    let selectedValues = isDefaultValueAvailable ? defaultValue : [];
    
    const onChange = (value) => {
        const {target} = value;
        if(target && target.nextElementSibling && target.nextElementSibling.innerText) {
            const targetText = target.nextElementSibling.innerText;
            if(target.checked) {
                selectedValues.push(targetText);
            } else {
                selectedValues = selectedValues.filter(item => item.toLowerCase() !== targetText.toLowerCase());
            }
            if(props.onChange) {
                props.onChange(selectedValues);
            }
        }
    }
    
    const onClear = () => {
        if(props.onChange) {
            props.onChange([]);
        }
    }

    const onClose = () => {
        $(".multiselectlist-wrap").removeClass("active");
        $(".multiselectlist-content").hide();
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
                                                checked={isChecked}
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
                        <button className="button button--black-outline clear-selection" onClick={onClear} >Clear</button>
                        <button className="button button--black apply-selection"  onClick={onClose}>Apply</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MultiSelectList;