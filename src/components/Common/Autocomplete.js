import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Autocomplete = (props) => {
    const { dataList } = props;

    if (dataList && dataList.length) {
        const { dataList, defaultValue, stylingClass } = props;
        let { elementId, title } = props;

        elementId = elementId ? elementId : "autocomplete-lst-component";
        title = title ? title : "Select Value";

        const componentAttrs = { displayAttr: "true", highlightAttr: "false" };
        let modifiedDataList = dataList.map((data) => {
            return { ...data, ...componentAttrs };
        });

        let dafaultDataDisplay = "",
            defaultDataValue = "",
            valueSelectedClassName = "";

        if (defaultValue) {
            const dafaultData = modifiedDataList.find((data) => {
                return data.value.toUpperCase() === defaultValue.toUpperCase();
            });
            if (dafaultData) {
                dafaultDataDisplay = dafaultData.display;
                defaultDataValue = dafaultData.value;
                valueSelectedClassName = "value-selected";
            }
        }

        const [isActiveState, setIsActiveState] = useState(false);
        const [placeHolderValue, setPlaceHolderValue] = useState("");
        const [arrowCursor, setArrowCursor] = useState(-1);
        const [textInputValue, setTextInputValue] = useState(dafaultDataDisplay);
        const [componentData, setComponentData] = useState(modifiedDataList);

        const initializeDataList = (dataList) => {
            const updatedData = componentData.map((data) => {
                data.displayAttr = "true";
                data.highlightAttr = "false";
                return data;
            });
            setComponentData((componentData) => updatedData);
        };

        const addActiveState = () => {
            setIsActiveState((isActiveState) => true);
        };

        const removeActiveState = () => {
            setIsActiveState((isActiveState) => false);
        };

        const changeTextValueToPlaceholder = (text) => {
            setPlaceHolderValue((placeHolderValue) => (text ? text : ""));
            setTextInputValue((textInputValue) => "");
        };

        const updateTextValueAndPlaceholder = (text) => {
            setPlaceHolderValue((placeHolderValue) => "");
            setTextInputValue((textInputValue) => (text ? text : ""));
        };

        const updateMatchingItems = (text) => {
            const searchedText = new RegExp(text ? text : "", "gi");
            const updatedData = componentData.map((data) => {
                if (data.searchdata.match(searchedText)) {
                    data.displayAttr = "true";
                } else {
                    data.displayAttr = "false";
                    data.highlightAttr = "false";
                }
                return data;
            });
            setComponentData((componentData) => updatedData);
        };

        const selectItemFromList = (value, text) => {
            initializeDataList();
            removeActiveState();
            updateTextValueAndPlaceholder(text ? text : "");
            props.onChange(value ? value : "");
        };

        const onClick = (event) => {
            if (props.onChange) {
                const { target } = event;
                if (target) {
                    let valueElement = target.className === "autocomplete__itemname" ? target.parentNode : target;
                    const { dataset } = valueElement;
                    if (dataset) {
                        const { value, text } = dataset;
                        selectItemFromList(value, text);
                    }
                }
            }
        };

        const onTextClick = (event) => {
            const { target } = event;
            addActiveState();
            changeTextValueToPlaceholder(target ? target.defaultValue : "");
            initializeDataList();
        };

        const onTextChange = (event) => {
            const { target } = event;
            let { value } = target;
            value = value ? value : "";
            updateMatchingItems(value);
            setTextInputValue((textInputValue) => value);
        };

        const onTextKeyDown = (event) => {
            const { keyCode } = event;
            if (keyCode === 38 || keyCode === 40) {
                let newArrowCursor = 0;
                let isArrowKeyPressed = false;
                if (keyCode === 38 && arrowCursor > 0) {
                    newArrowCursor = arrowCursor - 1;
                    isArrowKeyPressed = true;
                } else if (keyCode === 40 && arrowCursor < componentData.length - 1) {
                    newArrowCursor = arrowCursor + 1;
                    isArrowKeyPressed = true;
                }
                if (isArrowKeyPressed) {
                    try {
                        const updatedData = componentData.map((data) => {
                            data.highlightAttr = "false";
                            return data;
                        });
                        updatedData[newArrowCursor].highlightAttr = "true";
                        setComponentData((componentData) => updatedData);
                        setArrowCursor((arrowCursor) => newArrowCursor);
                    } catch (ex) {}
                }
            } else if (props.onChange && keyCode === 13) {
                const selectedData = componentData.filter((data) => {
                    return data.highlightAttr === "true";
                });
                if (selectedData && selectedData.length) {
                    const { value, display } = selectedData[0];
                    selectItemFromList(value, display);
                }
            }
        };

        const onclose = (event) => {
            removeActiveState();
            updateTextValueAndPlaceholder(dafaultDataDisplay);
        };

        //debugger;
        //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
        return (
            <ClickAwayListener onClickAway={onclose}>
                <div
                    className={`autocomplete ${valueSelectedClassName} ${isActiveState ? "active" : ""}`}
                    id="autocomplete-component"
                >
                    <span className="close" onClick={onclose}></span>
                    <div className="select-wrap">
                        <input
                            className="form-control txt autocomplete-search"
                            type="text"
                            autoComplete="off"
                            onClick={onTextClick}
                            onChange={onTextChange}
                            onKeyDown={onTextKeyDown}
                            value={textInputValue}
                            placeholder={placeHolderValue}
                            id={elementId}
                        />
                        <label className="form-control-placeholder" htmlFor={elementId}>
                            {title}
                        </label>
                    </div>
                    <div className="autocomplete-content">
                        <div className="autocomplete__list">
                            <ul className="autocomplete__listwrap">
                                {componentData.map((item, index) => {
                                    let stylingClassToApply = "";
                                    if (item.isStylingRequired) {
                                        stylingClassToApply += "highlight " + (stylingClass ? stylingClass : "");
                                    }
                                    const isSelected = item.value.toUpperCase() === defaultDataValue.toUpperCase();
                                    return (
                                        <li
                                            key={index}
                                            className={"autocomplete__item " + stylingClassToApply}
                                            data-searchcontent={item.searchdata}
                                            data-selected={isSelected.toString()}
                                            data-display={item.displayAttr}
                                            data-value={item.value}
                                            data-text={item.display}
                                            data-highlight={item.highlightAttr}
                                            onClick={onClick}
                                        >
                                            <span className="autocomplete__itemname">{item.display}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
};

export default Autocomplete;
