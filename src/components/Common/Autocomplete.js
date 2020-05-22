import React, { useState, useEffect } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { handelBodyScroll } from "../../utilities/Helper";

const Autocomplete = (props) => {
    const { dataList } = props;

    if (dataList && dataList.length) {
        const { dataList, defaultValue, stylingClass } = props;
        let { elementId, title } = props;

        elementId = elementId ? elementId : "autocomplete-list-component";
        title = title ? title : "Select Value";

        const componentAttrs = { displayAttr: "true", highlightAttr: "false" };
        let modifiedDataList = dataList.map((data) => {
            return { ...data, ...componentAttrs };
        });

        let dafaultDataDisplay = "",
            defaultDataValue = "",
            isValueSelected = false,
            defaultDataIndex = -1;

        if (defaultValue) {
            defaultDataIndex = modifiedDataList.findIndex((data) => {
                return data.value.toUpperCase() === defaultValue.toUpperCase();
            });
            const dafaultData = modifiedDataList.find((data) => {
                return data.value.toUpperCase() === defaultValue.toUpperCase();
            });
            if (dafaultData) {
                dafaultDataDisplay = dafaultData.display;
                defaultDataValue = dafaultData.value;
                isValueSelected = true;
            }
        }

        const [isActiveState, setIsActiveState] = useState(false);
        const [placeHolderValue, setPlaceHolderValue] = useState("");
        const [arrowCursor, setArrowCursor] = useState(defaultDataIndex);
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

        const setArrowCursorValue = (index) => {
            setArrowCursor((arrowCursor) => (index >= 0 ? index : -1));
        };

        const removeHighlightsAndCursorIndex = () => {
            const updatedData = componentData.map((data) => {
                data.highlightAttr = "false";
                return data;
            });
            setComponentData((componentData) => updatedData);
            setArrowCursor((arrowCursor) => -1);
        };

        const onClick = (event) => {
            if (props.onChange) {
                const { target } = event;
                if (target) {
                    let valueElement = target.className === "autocomplete__itemname" ? target.parentNode : target;
                    const { dataset } = valueElement;
                    if (dataset && !dataset.isDisabled) {
                        const { value, text } = dataset;
                        selectItemFromList(value, text);
                    }
                }
            }
        };

        const onTextClick = (event) => {
            if (!isActiveState) {
                addActiveState();
                changeTextValueToPlaceholder(dafaultDataDisplay ? dafaultDataDisplay : "");
                initializeDataList();
                setArrowCursorValue(defaultDataIndex);
            }
        };

        const onTextChange = (event) => {
            const { target } = event;
            let { value } = target;
            value = value ? value : "";
            updateMatchingItems(value);
            removeHighlightsAndCursorIndex();
            setTextInputValue((textInputValue) => value);
        };

        const findIndexOfVisibleItemFromList = (currentIndex) => {
            const displayedData = componentData.filter((data) => {
                return data.displayAttr === "true";
            });
            if (displayedData && displayedData.length > currentIndex) {
                const displayedDataItem = displayedData[currentIndex];
                if (displayedDataItem) {
                    const mainListIndex = componentData.findIndex((data) => {
                        return data.value.toLowerCase() === displayedDataItem.value.toLowerCase();
                    });
                    return mainListIndex;
                }
            }
            return -1;
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
                        const realIndex = findIndexOfVisibleItemFromList(newArrowCursor);
                        updatedData[realIndex].highlightAttr = "true";
                        setComponentData((componentData) => updatedData);
                        setArrowCursor((arrowCursor) => newArrowCursor);
                    } catch (ex) {}
                }
            } else if (props.onChange && keyCode === 13) {
                const selectedData = componentData.filter((data) => {
                    return data.highlightAttr === "true";
                });
                if (selectedData && selectedData.length && !selectedData[0].isDisabled) {
                    const { value, display } = selectedData[0];
                    selectItemFromList(value, display);
                }
            }
        };

        const onclose = (event) => {
            removeActiveState();
            updateTextValueAndPlaceholder(dafaultDataDisplay);
        };

        const onClearValue = () => {
            selectItemFromList("", "");
        };

        useEffect(() => {
            //Handle body scroll
            handelBodyScroll(isActiveState);
        });

        //Do not change below HTML structure, id names and class names, as they are referenced in the scripts above.
        return (
            <ClickAwayListener onClickAway={onclose}>
                <div
                    className={`autocomplete ${isValueSelected ? "value-selected" : ""} ${isActiveState ? "active" : ""}`}
                    id="autocomplete-component"
                >
                    <span className="close close-component" onClick={onclose}></span>
                    <span className="close clear-component" onClick={onClearValue}></span>
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
                                            id={`${elementId}__autocomplete__item__${index}`}
                                            className={"autocomplete__item " + stylingClassToApply}
                                            data-searchcontent={item.searchdata}
                                            data-selected={isSelected.toString()}
                                            data-disabled={item.isDisabled}
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
