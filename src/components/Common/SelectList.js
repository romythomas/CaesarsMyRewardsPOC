import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const SelectList = (props) => {
    const { dataList, defaultValue } = props;

    const [isActiveState, setIsActiveState] = useState(false);
    const [selectedSort, setSelectedSort] = useState(defaultValue);

    const onSpanClick = () => {
        setIsActiveState((isActiveState) => !isActiveState);
    };

    const onClose = () => {
        setIsActiveState((isActiveState) => false);
    };

    const onClick = (event) => {
        const { target } = event;
        if (props.onClick && target && target.attributes && target.attributes.length && target.attributes[0].value) {
            const value = target.attributes[0].value;
            setSelectedSort((selectedSort) => value);
            setIsActiveState((isActiveState) => false);
            props.onClick(value);
        }
    };
    if (dataList && dataList.length) {
        let valueToDisplay = selectedSort ? selectedSort : "";

        return (
            <ClickAwayListener onClickAway={onClose}>
                <div className={`selectList dropdown selectDropdown filled ${isActiveState ? "open" : ""}`}>
                    <ul>
                        {dataList.map((data, index) => {
                            let isSelected = false;
                            if (data && data.value && data.value.toLowerCase() === valueToDisplay.toLowerCase()) {
                                isSelected = true;
                                valueToDisplay = data.name;
                            }
                            return (
                                <li className={isSelected ? "active" : ""} key={index}>
                                    <a onClick={onClick} value={data.value} key={index}>
                                        {data.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <span onClick={onSpanClick}>{valueToDisplay}</span>
                </div>
            </ClickAwayListener>
        );
    }
};

export default SelectList;
