import React, { useState, useEffect } from "react";
import { handelBodyScroll } from "../../utilities/Helper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const MultiSelectList = (props) => {
    const [isActiveState, setIsActiveState] = useState(false);

    const { dataList, defaultValue } = props;
    let { title, selectId } = props;

    title = title ? title : "Select Filters";
    selectId = selectId ? selectId : "chk-filter";

    const isDefaultValueAvailable = defaultValue && defaultValue.length;
    let selectedValues = isDefaultValueAvailable ? defaultValue : [];

    const getFilterNameFromValue = (value) => {
        if (value) {
            const dataItem = dataList.find((data) => {
                return data.value.toLowerCase() === value.toLowerCase();
            });
            const { name } = dataItem;
            return name ? name : "";
        }
        return "";
    };

    const selectedFilterNames = [];
    selectedValues.map((value) => {
        selectedFilterNames.push(getFilterNameFromValue(value));
    });

    const onChange = (value) => {
        if (props.onChange) {
            const { target } = value;
            if (target && target.dataset) {
                const { value } = target.dataset;
                if (target.checked) {
                    selectedValues.push(value);
                } else {
                    selectedValues = selectedValues.filter((item) => item.toLowerCase() !== value.toLowerCase());
                }
                props.onChange(selectedValues);
            }
        }
    };

    const onClear = () => {
        if (props.onChange) {
            props.onChange([]);
        }
    };

    const onClose = () => {
        setIsActiveState((isActiveState) => false);
    };

    const onTextClick = () => {
        setIsActiveState((isActiveState) => !isActiveState);
    };

    useEffect(() => {
        //Handle body scroll
        handelBodyScroll(isActiveState);
    });

    if (dataList && dataList.length) {
        //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
        return (
            <ClickAwayListener onClickAway={onClose}>
                <div className={`multiselectlist ${isActiveState ? "open" : ""}`}>
                    <div className={`select-wrap multiselectlist-wrap ${isActiveState ? "active" : ""}`}>
                        <input
                            className="form-control txt"
                            type="text"
                            onClick={onTextClick}
                            id={selectId}
                            value={selectedFilterNames.join(",")}
                            readOnly
                        />
                        <label className="form-control-placeholder" htmlFor={selectId}>
                            {title}
                        </label>
                    </div>
                    <div className="multiselectlist-content">
                        <span className="close" onClick={onClose}></span>
                        <div className="multiselectlist__list">
                            <h2 className="title-pop-mobile">{title}</h2>
                            <ul className="multiselectlist__listwrap">
                                <li className="multiselectlist__listitem">
                                    {dataList.map((data, index) => {
                                        let isChecked = isDefaultValueAvailable ? defaultValue.includes(data.value) : false;
                                        return (
                                            <div key={index} className="multiselectlist__item">
                                                <input
                                                    id={selectId + "-chk-" + index}
                                                    onChange={onChange}
                                                    className="checkbox-custom"
                                                    data-value={data.value}
                                                    name={selectId + "-chk-" + index}
                                                    checked={isChecked}
                                                    type="checkbox"
                                                />
                                                <label htmlFor={selectId + "-chk-" + index} className="checkbox-custom-label">
                                                    {data.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </li>
                            </ul>
                        </div>
                        <div className="multiselectlist__btn">
                            <button className="button button--black-outline clear-selection" onClick={onClear}>
                                Clear
                            </button>
                            <button className="button button--black apply-selection" onClick={onClose}>
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
};

export default MultiSelectList;
