import React from 'react';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';

const moment = extendMoment(originalMoment);

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
            $searchCalendarContent.toggle();
        });
        /**
         * Handels the show/hide of (date/month) range calendars based on 'Exact Date' calendar button click.
         */
        $('.searchCalendar-content .searchBy-Dates').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $dateRangeCalendarItem.show();
            $monthRangeCalendarItem.hide();
        });
        /**
         * Handels the show/hide of (date/month) range calendars based on 'Flexible Date' calendar button click.
         */
        $('.searchCalendar-content .searchBy-Months').off('click touch').on('click touch', function(e) {
            e.preventDefault();
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
            $searchCalendarContent.hide();
        });
        /**
         * Closes the (date/month) range calendars upon clicking HTML body other than the (date/month) range calendars.
         */
        $(document).off('click').on('click', 'body', function(e) {
            if(e) {
                const {target} = e;
                const targetClassName = (target.className) ? "." + target.className : "";
                if(targetClassName !== "searchCalendar" && $(".searchCalendar").find(target).length <= 0) {
                    $searchCalendarContent.hide();
                }
            }
        });
    });
}

/**
 * Updates the input text value based on the dates selected from date range calendar.
 */
const updateDateRangeValueUI = (startDate, endDate) => {
    $('.searchCalendar-wrap input:text').val(new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString());
}

/**
 * Updates the input text value and active class based on the dates selected from month range calendar.
 */
const updateMonthRangeValueUI = (value, event) => {
    $(".monthRangeCalendar__item .month-item.active").removeClass("active");
    event.target.classList.add("active");
    $('.searchCalendar-wrap input:text').val(value);
}

/**
 * Handels the functional component render and its properties.
 */
const SearchCalendar = (props)  => {
    //Load scripts to handle click/touch events
    loadScript();
    //Values that are passed as properties to the component
    const {defaultValue, calendarId} = props;
    let {minimumDate, maximumDate} = props;
    //Set lowest and highest calendar selectable dates, if not defined in properties
    minimumDate = minimumDate && moment(minimumDate).isValid() ? moment(minimumDate) : moment();
    maximumDate = maximumDate && moment(maximumDate).isValid() ? moment(maximumDate) : moment().add(1, 'year');

    //#region - Month range calendar initialization code
        //Create array to hold month values available for flexible date search
        const monthRanges = [];
        //Loop starting from minimumDate till minimumDate and store the first date of each month
        let monthRangeStartDate = minimumDate.clone(); //use clone to avoid mutation of original variable
        while (monthRangeStartDate.isBefore(maximumDate)) {
            if(monthRangeStartDate.month() === minimumDate.month()) {
                monthRanges.push(monthRangeStartDate.clone());
            } else {
                monthRanges.push(monthRangeStartDate.clone().startOf('month'));
            }
            monthRangeStartDate = monthRangeStartDate.add(1, 'month');
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
                const startDate = moment(target.dataset.value);
                const endDate = startDate.clone().endOf('month');
                //If moment dates are valid, update UI textbox value
                if(startDate.isValid() && endDate.isValid()) {
                    //Update textbox UI value and active class
                    updateMonthRangeValueUI(target.innerText, event);
                    //Pass date values to component property
                    if(props.onChange) {
                        $(".searchCalendar-content").hide();
                        props.onChange(startDate._d, endDate._d);
                    }
                }
            }
        }
    //#endregion

    //#region - Date range calendar code
        //Create local state object to hold value of calendar selection
        let [defaultDateRange, setDefaultDateRange] = React.useState(null);
        //Process default value received through properties, if the calendar selection value in local state is empty
        if(!defaultDateRange && defaultValue && defaultValue.startDate && defaultValue.endDate) {
            const defaultStartDate = moment(defaultValue.startDate);
            const defaultEndDate = moment(defaultValue.endDate);
            //Validate the default values present in properties
            //If valid, Update textbot value in UI and set the local store value for calendar selection
            if(defaultStartDate.isValid() && defaultEndDate.isValid()) {
                updateDateRangeValueUI(defaultStartDate, defaultEndDate);
                defaultDateRange = moment.range(defaultStartDate, defaultEndDate);
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
                //Find start date and last minute of end date
                const startDate = start._d;
                const endDate = end.endOf('day')._d;
                //Update textbox UI
                updateDateRangeValueUI(startDate, endDate);
                //Update range calendar state value
                setDefaultDateRange(moment.range(startDate, endDate));
                //Pass date values to component property
                if(props.onChange) {
                    $(".searchCalendar-content").hide();
                    props.onChange(startDate, endDate);
                }
            }
        }
    //#endregion

    //#region - Render elements

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
                        id={calendarId}
                        required
                    />
                    <label className="form-control-placeholder" htmlFor={calendarId}>
                        Start date - End date
                    </label>
                </div>
                <div className="searchCalendar-content">
                    <span className="close"></span>
                    <div className="searchCalendar-options">
                        <button className="searchBy-Dates">Exact Date</button>
                        <button className="searchBy-Months">Flexible Dates</button>
                    </div>
                    <div className="dateRangeCalendar__item">
                        <DateRangePicker
                                onSelect={onDateChnage}
                                minimumDate={new Date(minimumDate)}
                                maximumDate={new Date(maximumDate)}
                                value={defaultDateRange}
                                selectionType="range"
                                numberOfCalendars={2}
                            />
                    </div>
                    <div className="monthRangeCalendar__item">
                        <ul className="monthRangeCalendar__list">
                            {monthRanges.map((date, index) => {
                                return(
                                    <li key={index} 
                                        className="month-item" 
                                        data-value={date.format("DD-MMM-YYYY")}
                                        onClick={onMonthChange}>
                                            {date.format("MMM YYYY")}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    //#endregion
}

export default SearchCalendar;