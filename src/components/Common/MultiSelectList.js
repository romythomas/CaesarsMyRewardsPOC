import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const MultiSelectList = (props) => {
  const [isActiveState, setIsActiveState] = useState(false);

  const { dataList, defaultValue } = props;
  let { title, selectId } = props;

  title = title ? title : "Select Filters";
  selectId = selectId ? selectId : "chk-filter";

  const isDefaultValueAvailable = defaultValue && defaultValue.length;
  let selectedValues = isDefaultValueAvailable ? defaultValue : [];

  const activeClassName = isActiveState ? "active" : "";

  const onChange = (value) => {
    if (props.onChange) {
      const { target } = value;
      if (
        target &&
        target.nextElementSibling &&
        target.nextElementSibling.innerText
      ) {
        const targetText = target.nextElementSibling.innerText;
        if (target.checked) {
          selectedValues.push(targetText);
        } else {
          selectedValues = selectedValues.filter(
            (item) => item.toLowerCase() !== targetText.toLowerCase()
          );
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
    setIsActiveState(false);
  };

  const onTextClick = () => {
    setIsActiveState((isActiveState) => !isActiveState);
  };

  if (dataList && dataList.length) {
    //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
    return (
      <ClickAwayListener onClickAway={onClose}>
        <div className={`multiselectlist ${activeClassName}`}>
          <div className="select-wrap multiselectlist-wrap">
            <input
              className="form-control txt"
              type="text"
              onClick={onTextClick}
              id={selectId}
              value={selectedValues.join(",")}
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
                    let isChecked = isDefaultValueAvailable
                      ? defaultValue.includes(data)
                      : false;
                    return (
                      <div key={index} className="multiselectlist__item">
                        <input
                          id={selectId + "-chk-" + index}
                          onChange={onChange}
                          className="checkbox-custom"
                          name={selectId + "-chk-" + index}
                          checked={isChecked}
                          type="checkbox"
                        />
                        <label
                          htmlFor={selectId + "-chk-" + index}
                          className="checkbox-custom-label"
                        >
                          {data}
                        </label>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </div>
            <div className="multiselectlist__btn">
              <button
                className="button button--black-outline clear-selection"
                onClick={onClear}
              >
                Clear
              </button>
              <button
                className="button button--black apply-selection"
                onClick={onClose}
              >
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
