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
         * Handles the touchstart event of date cell of date calendar and prevents firing click event while scrolling in mobile.
         */
        $dateRangeCalendarItem.on("touchstart", ".DateRangePicker__Date" , function(event) {
            if(event && event.cancelable) {
                event.stopPropagation();
            }
        });
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
            $dateRangeCalendarItem.addClass("active");
            $monthRangeCalendarItem.removeClass("active");
        });
        /**
         * Handels the show/hide of (date/month) range calendars based on 'Flexible Date' calendar button click.
         */
        $('.searchCalendar-content .searchBy-Months').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $('.searchBy-Dates').removeClass("selected");
            $('.searchBy-Months').addClass("selected");
            $dateRangeCalendarItem.removeClass("active");
            $monthRangeCalendarItem.addClass("active");
        });
        /**
         * Handels the close button click event of the (date/month) range calendars.
         */
        $('.searchCalendar .close').on('click touch', function(e) {
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
    const {defaultType, defaultDateValue, defaultMonthValue, calendarId} = props;
    let {minimumDate, maximumDate, title} = props;
    title = title ? title : "Start date - End date";
    //Set lowest and highest calendar selectable dates, if not defined in properties
    minimumDate = minimumDate && getMoment(minimumDate).isValid() ? getMoment(minimumDate) : getMoment();
    maximumDate = maximumDate && getMoment(maximumDate).isValid() ? getMoment(maximumDate) : getMoment().add(1, 'year');

    //Variables to hold values of date calendar and month calendar
    let dateCalendarStartDate = null, dateCalendarEndDate = null, monthCalendarValue=null;
    //Variable that holds the value to be displayed in the textbox in UI
    let selectedDateValue = "";

    //Flag to see if selected calendar is date or month
    const isDefaultDateCalendar = defaultType === "date";

    //Set class names for UI elements to show/hide corresponding HTML elements
    const dateCalendarActiveClass = isDefaultDateCalendar ? "active" : "";
    const monthCalendarActiveClass = isDefaultDateCalendar ? "" : "active";
    const dateCalendarSelectButtonClass = isDefaultDateCalendar ? "selected" : "";
    const monthCalendarSelectButtonClass = isDefaultDateCalendar ? "" : "selected";

    //If default value for date calendar is present and valid, convert it to moment and store in respective variables
    //Also update varialbe that holds the value to be displayed in the textbox in UI, if needed
    if(defaultDateValue) {
        const {startDate, endDate} = defaultDateValue;
        const startDateMoment = getMoment(startDate);
        const endDateMoment = getMoment(endDate);
        if(startDateMoment.isValid() && endDateMoment.isValid()) {
            dateCalendarStartDate = startDateMoment.startOf('day');
            dateCalendarEndDate = endDateMoment.endOf("day");
            //If default calendar is date calendar, update variable value to be displayed in the textbox in UI
            if(isDefaultDateCalendar) {
                selectedDateValue = getDisplayValueOfDateCalendarSelection(startDate, endDate);
            }
        }
    }

    //If default value for month calendar is present and valid, convert it to moment format and store in corresponding variable
    //Also update varialbe that holds the value to be displayed in the textbox in UI, if needed
    if(defaultMonthValue) {
        const {startDate, endDate} = defaultMonthValue;
        const startDateMoment = getMoment(startDate);
        const endDateMoment = getMoment(endDate);
        if(startDateMoment.isValid() && endDateMoment.isValid()) {
            monthCalendarValue = startDate.format("MMM YYYY");
            //If default calendar is not date calendar, update variable value to be displayed in the textbox in UI
            if(!isDefaultDateCalendar) {
                selectedDateValue = monthCalendarValue;
            }
        }
    }
    
    //Create array to hold month values available for flexible date calendar.
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

    /**
     * Handles the event of the range calendar selection.
     * Get the startdate and enddate selected.
     * Update textbot UI values and pass these values to component property.
     * @param {Object} dateRange - Date object which contains startdate and enddate
     */
    const onDateChnage = (dateRange) => {
        const {start, end} = dateRange;
        //If callback event is present in props and date values are valid, pass values to component property
        if(props.onChange && start && start.isValid() && end && end.isValid()) {
            hideCalendar();
            props.onChange("date", start, end);
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
            //If callback event is present in props and date values are valid, pass values to component property
            if(props.onChange && startDate.isValid() && endDate.isValid()) {
                hideCalendar();
                props.onChange("month", startDate, endDate);
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
                    value={selectedDateValue}
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
                            value={getMomentRange(dateCalendarStartDate, dateCalendarEndDate)}
                            selectionType="range"
                            numberOfCalendars={2}
                        />
                </div>
                <div className={`monthRangeCalendar__item ${monthCalendarActiveClass}`}>
                    <ul className="monthRangeCalendar__list">
                        {monthRanges.map((date, index) => {
                            const valueToDisplay = date.format("MMM YYYY");
                            const activeClassNames = monthCalendarValue === valueToDisplay ? "active" : "";
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