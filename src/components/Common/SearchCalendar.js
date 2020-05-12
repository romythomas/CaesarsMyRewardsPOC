import React from 'react';
import {getMoment, getMomentRange} from "../../utilities/Helper";
import DateRangePicker from 'react-daterange-picker';

/**
 * Defines all jQuery events used to handel the clicks and show/hide.
 */
const loadScript = () => {
    $(document).ready(function(){
        const $searchCalendarContent = $(".searchCalendar-content");
        const $dateRangeCalendarItem = $(".dateRangeCalendar__item");
        const $monthRangeCalendarItem = $(".monthRangeCalendar__item");
        /**
         * Handles the click events of text input, to show/hide the (date/month) range calendars.
         */
        $('.searchCalendar-wrap').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".searchCalendar-wrap").toggleClass("active");
            $searchCalendarContent.toggle();
        });
        /**
         * Handels the show/hide of (date/month) range calendars based on 'Exact Date' calendar button click.
         */
        $('.searchCalendar-content .searchBy-Dates').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $('.searchBy-Dates').addClass("selected");
            $('.searchBy-Months').removeClass("selected");
            $dateRangeCalendarItem.show();
            $monthRangeCalendarItem.hide();
        });
        /**
         * Handels the show/hide of (date/month) range calendars based on 'Flexible Date' calendar button click.
         */
        $('.searchCalendar-content .searchBy-Months').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $('.searchBy-Dates').removeClass("selected");
            $('.searchBy-Months').addClass("selected");
            $dateRangeCalendarItem.hide();
            $monthRangeCalendarItem.show();
        });
        /**
         * Make the keyboard entry disabled for text input.
         */
        $('.searchCalendar-wrap .txt').keypress(function(e) {
            return false;
        });
        /**
         * Handels the close button click event of the (date/month) range calendars.
         */
        $('.searchCalendar .close').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".searchCalendar-wrap").removeClass("active");
            $searchCalendarContent.hide();
        });
        /**
         * Closes the (date/month) range calendars upon clicking HTML body other than the (date/month) range calendars.
         */
        $(document).on('click', 'body', function(e) {
            if(e) {
                const {target} = e;
                const targetClassName = (target.className) ? `.${target.className}` : "";
                if(targetClassName !== "searchCalendar" && $(".searchCalendar").find(target).length <= 0) {
                    $(".searchCalendar-wrap").removeClass("active");
                    $searchCalendarContent.hide();
                }
            }
        });
    });
}

/**
 * Formats the start date and end date and joins the value, to display in UI
 * @param {Date} startDate - Start date selected from range calendar.
 * @param {Date} endDate - End date selected from range calendar.
 * @returns {String} - Concatenated formatted date string values.
 */
const getDisplayValueOfDateCalendarSelection = (startDate, endDate) => {
    return startDate.format("MMM D, YYYY") + " - " + endDate.format("MMM D, YYYY");
}

/**
 * Hides the month/date selection UI.
 */
const hideCalendar = () => {
    $(".searchCalendar-content").hide();
}

/**
 * Handels the functional component render and its properties.
 * @param {Object} props - Property of the component.
 * @returns {HTMLElement} - Returns HTML to be rendered.
 */
const SearchCalendar = (props)  => {
    //Load scripts to handle click/touch events
    loadScript();
    //Values that are passed as properties to the component
    const {defaultType, defaultValue, calendarId} = props;
    let {minimumDate, maximumDate, title} = props;
    title = title ? title : "Start date - End date";
    let defaultDateRangeSelectedValue = "";
    //Set lowest and highest calendar selectable dates, if not defined in properties
    minimumDate = minimumDate && getMoment(minimumDate).isValid() ? getMoment(minimumDate) : getMoment();
    maximumDate = maximumDate && getMoment(maximumDate).isValid() ? getMoment(maximumDate) : getMoment().add(1, 'year');

    //Active class names for date calendar/month calendar items and their respective buttons based on default value
    let dateCalendarActiveClass = "active";
    let monthCalendarActiveClass = "";
    let dateCalendarSelectButtonClass = "selected";
    let monthCalendarSelectButtonClass = "";
    if(defaultType === "month") {
        dateCalendarActiveClass = "";
        monthCalendarActiveClass = "active";
        dateCalendarSelectButtonClass = "";
        monthCalendarSelectButtonClass = "selected";
    }

    //Create array to hold month values available for flexible date search
    const monthRanges = [];
    //Loops through mininum date till maximum date and collects all valid first dates of each month
    let startOfDateValue = minimumDate.clone().startOf('month').startOf('day');
    while(startOfDateValue.isBefore(maximumDate.clone().startOf('month').startOf('day'))) {
        if(startOfDateValue.isBefore(getMoment().clone().startOf('day'))) {
            monthRanges.push(getMoment().clone());
        } else {
            monthRanges.push(startOfDateValue);
        }
        startOfDateValue = startOfDateValue.clone().add(1, 'month');
    }

    const {startDate, endDate} = defaultValue;
    if(startDate && startDate.isValid() && endDate && endDate.isValid()) {
        if(defaultType === "date") {
            //Set the local store value for calendar selection
            defaultDateRangeSelectedValue = getDisplayValueOfDateCalendarSelection(startDate, endDate);
        } else {
            //Set the local store value for month calendar selection
            defaultDateRangeSelectedValue = startDate.format("MMM YYYY");
        }
    }

    /**
     * Handles the event of the range calendar selection.
     * Get the startdate and enddate selected.
     * Update textbot UI values and pass these values to component property.
     * @param {Object} dateRange - Date object which contains startdate and enddate
     */
    const onDateChnage = (dateRange) => {
        const {start, end} = dateRange;
        //Check if date values are present
        if(start && start.isValid() && end && end.isValid()) {
            //Pass date values to component property
            if(props.onChange) {
                hideCalendar();
                props.onChange("date", start, end);
            }
        }
    }
        
    /**
     * Handles the event of the month range selection.
     * Get month value selected and find the first and last date of the slected month.
     * Update textbot UI values and pass the startdate and enddate values to component property.
     * @param {EventHandler} event - Click event of selected month search item
     */
    const onMonthChange = (event) => {
        const {target} = event;
        //Check if date value is presented in the slection
        if(target && target.dataset && target.dataset.value) {
            //Find startdate and enddate. Then convert them to moment
            const startDate = getMoment(target.dataset.value);
            const endDate = startDate.clone().endOf('month');
            //If moment dates are valid, update UI textbox value
            if(startDate.isValid() && endDate.isValid()) {
                //Pass date values to component property
                if(props.onChange) {
                    hideCalendar();
                    props.onChange("month", startDate, endDate);
                }
            }
        }
    }

    /**********************************************************************************************************
     * Don't change any element IDs, names, class names or HTML structure below, as they are related to the scripts written above.
     ************************************************************************************************************/
    return (
        <div className="searchCalendar">
            <div className="select-wrap searchCalendar-wrap">
                <input
                    className="form-control txt"
                    type="text"
                    autoComplete="off"
                    value={defaultDateRangeSelectedValue}
                    id={calendarId}
                    readOnly
                />
                <label className="form-control-placeholder" htmlFor={calendarId}>
                    {title}
                </label>
            </div>
            <div className="searchCalendar-content">
                <span className="close"></span>
                <div className="searchCalendar-options">
                    <h2 className="title-pop-mobile">{title}</h2>
                    <button className={`searchBy-Dates ${dateCalendarSelectButtonClass}`}>Exact Date</button>
                    <button className={`searchBy-Months ${monthCalendarSelectButtonClass}`}>Flexible Dates</button>
                </div>
                <div className={`dateRangeCalendar__item ${dateCalendarActiveClass}`}>
                    <DateRangePicker
                            onSelect={onDateChnage}
                            minimumDate={new Date(minimumDate)}
                            maximumDate={new Date(maximumDate)}
                            value={getMomentRange(defaultValue.startDate, defaultValue.endDate)}
                            selectionType="range"
                            numberOfCalendars={2}
                        />
                </div>
                <div className={`monthRangeCalendar__item ${monthCalendarActiveClass}`}>
                    <ul className="monthRangeCalendar__list">
                        {monthRanges.map((date, index) => {
                            const valueToDisplay = date.format("MMM YYYY");
                            const activeClassNames = defaultValue.startDate.format("MMM YYYY") === valueToDisplay ? "active" : "";
                            return(
                                <li key={index} 
                                    className={`month-item ${activeClassNames}`} 
                                    data-value={date.format("MMM D, YYYY")}
                                    onClick={onMonthChange}>
                                        {valueToDisplay}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchCalendar;