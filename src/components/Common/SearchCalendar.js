import React, { useState, useEffect } from "react";
import { getMoment, getMomentRange, handelBodyScroll } from "../../utilities/Helper";
import DateRangePicker from "react-daterange-picker";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

/**
 * Handels the functional component render and its properties.
 * @param {Object} props - Property of the component.
 * @returns {HTMLElement} - Returns HTML to be rendered.
 */
const SearchCalendar = (props) => {
    //Values that are passed as properties to the component
    const { defaultType, defaultDateValue, defaultMonthValue } = props;
    let { minimumDate, maximumDate, title, calendarId } = props;

    //Local state objects used to handle show/hide of component and handle selection of calendar (month/date)
    const [isActiveState, setIsActiveState] = useState(false);
    const [defaultCalendar, setDefaultCalendar] = useState(defaultType);

    //Set title and id, if not present in props
    title = title ? title : "Start date - End date";
    calendarId = calendarId ? calendarId : "search-calendar";
    //Set lowest and highest calendar selectable dates, if not defined in properties
    minimumDate = minimumDate && getMoment(minimumDate).isValid() ? getMoment(minimumDate) : getMoment();
    maximumDate = maximumDate && getMoment(maximumDate).isValid() ? getMoment(maximumDate) : getMoment().add(1, "year");

    //Variables to hold values of date calendar and month calendar
    let dateCalendarStartDate = null,
        dateCalendarEndDate = null,
        monthCalendarValue = null;
    //Variable that holds the value to be displayed in the textbox in UI
    let selectedDateValue = "";

    //Flag to see if selected calendar is date
    const isDefaultDateCalendar = defaultCalendar === "date";
    const isDefaultDateCalendarValueSelected = defaultType === "date";

    //If default calendar is date calendar and default value for date calendar is present and valid, convert it to moment and store in respective variables
    if (defaultDateValue) {
        const { startDate, endDate } = defaultDateValue;
        const startDateMoment = getMoment(startDate);
        const endDateMoment = getMoment(endDate);
        if (startDateMoment.isValid() && endDateMoment.isValid()) {
            dateCalendarStartDate = startDateMoment.startOf("day");
            dateCalendarEndDate = endDateMoment.endOf("day");
            //Update variable value to be displayed in the textbox in UI
            if (isDefaultDateCalendarValueSelected) {
                selectedDateValue = startDate.format("MMM D, YYYY") + " - " + endDate.format("MMM D, YYYY");
            }
        }
    }

    //If default value for month calendar is present and valid, convert it to moment format and store in corresponding variable
    if (defaultMonthValue) {
        const { startDate, endDate } = defaultMonthValue;
        const startDateMoment = getMoment(startDate);
        const endDateMoment = getMoment(endDate);
        if (startDateMoment.isValid() && endDateMoment.isValid()) {
            monthCalendarValue = startDate.format("MMM YYYY");
            //If default calendar is not date calendar, update variable value to be displayed in the textbox in UI
            if (!isDefaultDateCalendarValueSelected) {
                selectedDateValue = monthCalendarValue;
            }
        }
    }

    //Create array to hold month values available for flexible date calendar.
    const monthRanges = [];
    //Loops through mininum date till maximum date and collects all valid first dates of each month
    let startOfDateValue = minimumDate.clone().startOf("month").startOf("day");
    while (startOfDateValue.isBefore(maximumDate.clone().startOf("month").startOf("day"))) {
        if (startOfDateValue.isBefore(getMoment().clone().startOf("day"))) {
            monthRanges.push(getMoment().clone());
        } else {
            monthRanges.push(startOfDateValue);
        }
        startOfDateValue = startOfDateValue.clone().add(1, "month");
    }

    /**
     * Handles the event of the range calendar selection.
     * Get the startdate and enddate selected.
     * Update local state to hide calendar component.
     * Pass the values to component property.
     * @param {Object} dateRange - Date object which contains startdate and enddate
     */
    const onDateChnage = (dateRange) => {
        const { start, end } = dateRange;
        //If callback event is present in props and date values are valid, pass values to component property
        if (props.onChange && start && start.isValid() && end && end.isValid()) {
            //Update local state value to hide the calendar component
            setIsActiveState((isActiveState) => false);
            props.onChange("date", start, end);
        }
    };

    /**
     * Handles the event of the month range selection.
     * Get month value selected and find the first and last date of the slected month.
     * Update local state to hide calendar component.
     * Pass the startdate and enddate values to component property.
     * @param {EventHandler} event - Click event of selected month search item
     */
    const onMonthChange = (event) => {
        const { target } = event;
        //Check if date value is presented in the slection
        if (target && target.dataset && target.dataset.value) {
            //Find startdate and enddate. Then convert them to moment
            const startDate = getMoment(new Date(target.dataset.value));
            const endDate = startDate.clone().endOf("month");
            //If callback event is present in props and date values are valid, pass values to component property
            if (props.onChange && startDate.isValid() && endDate.isValid()) {
                //Update local state value to hide the calendar component
                setIsActiveState((isActiveState) => false);
                props.onChange("month", startDate, endDate);
            }
        }
    };

    /**
     * Handles the click event of calendar change button.
     * Find if clicked button is date or month and update state value based on the selection.
     * @param {EventHandler} event - Click event of button to switch calendars
     */
    const onChangeCalendar = (event) => {
        const { target } = event;
        if (target) {
            if (target.classList.contains("searchBy-Dates")) {
                setDefaultCalendar((defaultCalendar) => "date");
            } else {
                setDefaultCalendar((defaultCalendar) => "month");
            }
        }
    };

    /**
     * Handles the click event of textbox in calendar component.
     * Update state value to close calendar component if it is in open state and vice-versa.
     */
    const onTextClick = () => {
        setIsActiveState((isActiveState) => !isActiveState);
    };

    /**
     * Handles the click event of close button.
     * Update state value to close the calendar component.
     */
    const onClose = () => {
        setDefaultCalendar((defaultCalendar) => defaultType);
        setIsActiveState((isActiveState) => false);
    };

    /**
     * To fix an issue with the npm package.
     * Handles the touchstart event of date cell of date calendar and prevents firing click event while scrolling in mobile.
     */
    $(".dateRangeCalendar__item").on("touchstart", ".DateRangePicker__Date", function (event) {
        if (event && event.cancelable) {
            event.stopPropagation();
        }
    });

    useEffect(() => {
        //Handle body scroll
        handelBodyScroll(isActiveState);
    });

    /**********************************************************************************************************
     * Don't change any element IDs, names, class names or HTML structure below, as they are related to the scripts written above.
     ************************************************************************************************************/
    return (
        <ClickAwayListener onClickAway={onClose}>
            <div className={`searchCalendar ${isActiveState ? "open" : ""}`}>
                <div className={`select-wrap searchCalendar-wrap ${isActiveState ? "active" : ""}`}>
                    <input
                        className="form-control txt"
                        type="text"
                        autoComplete="off"
                        onClick={onTextClick}
                        value={selectedDateValue}
                        id={calendarId}
                        readOnly
                    />
                    <label className="form-control-placeholder" htmlFor={calendarId}>
                        {title}
                    </label>
                </div>
                <div className="searchCalendar-content">
                    <span className="close" onClick={onClose}></span>
                    <div className="searchCalendar-options">
                        <h2 className="title-pop-mobile">{title}</h2>
                        <button
                            onClick={onChangeCalendar}
                            className={`searchBy-Dates ${isDefaultDateCalendar ? "selected" : ""}`}
                        >
                            Exact Date
                        </button>
                        <button
                            onClick={onChangeCalendar}
                            className={`searchBy-Months ${isDefaultDateCalendar ? "" : "selected"}`}
                        >
                            Flexible Dates
                        </button>
                    </div>
                    <div className={`dateRangeCalendar__item ${isDefaultDateCalendar ? "active" : ""}`}>
                        <DateRangePicker
                            onSelect={onDateChnage}
                            minimumDate={new Date(minimumDate)}
                            maximumDate={new Date(maximumDate)}
                            value={
                                dateCalendarStartDate && dateCalendarEndDate
                                    ? getMomentRange(dateCalendarStartDate, dateCalendarEndDate)
                                    : null
                            }
                            selectionType="range"
                            numberOfCalendars={2}
                        />
                    </div>
                    <div className={`monthRangeCalendar__item ${isDefaultDateCalendar ? "" : "active"}`}>
                        <ul className="monthRangeCalendar__list">
                            {monthRanges.map((date, index) => {
                                const valueToDisplay = date.format("MMM YYYY");
                                const activeClassNames = monthCalendarValue === valueToDisplay ? "active" : "";
                                return (
                                    <li
                                        key={index}
                                        id={`${calendarId}__month__item__${index}`}
                                        className={`month-item ${activeClassNames}`}
                                        data-value={date.format("MMM D, YYYY")}
                                        onClick={onMonthChange}
                                    >
                                        {valueToDisplay}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default SearchCalendar;
