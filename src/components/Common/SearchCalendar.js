import React from 'react';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';

const moment = extendMoment(originalMoment);

const loadScript = () => {
    $(document).ready(function(){
        $('.searchCalendar-wrap').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".searchCalendar-content").toggle();
        });
        $('.searchCalendar-content .searchBy-Dates').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".dateRangeCalendar__item").show();
            $(".monthRangeCalendar__item").hide();
        });
        $('.searchCalendar-content .searchBy-Months').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            $(".dateRangeCalendar__item").hide();
            $(".monthRangeCalendar__item").show();
        });
        $('.searchCalendar-wrap .txt').keypress(function(e) {
            return false;
        });
        $('.searchCalendar .close').off('click touch').on('click touch', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".searchCalendar-content").hide();
        });
        $(document).off('click').on('click', 'body', function(e) {
            if(e) {
                const {target} = e;
                const targetClassName = (target.className) ? "." + target.className : "";
                if(targetClassName !== "searchCalendar" && $(".searchCalendar").find(target).length <= 0) {
                    $('.searchCalendar-content').hide();
                }
            }
        });
    });
}

const updateDateRangeValueUI = (startDate, endDate) => {
    $('.searchCalendar-wrap input:text').val(new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString());
}

const updateMonthRangeValueUI = (value) => {
    $('.searchCalendar-wrap input:text').val(value);
}

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
                    //Update textbox UI value
                    updateMonthRangeValueUI(target.innerText);
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
                //Update textbox UI and update range calendar state value
                updateDateRangeValueUI(startDate, endDate);
                setDefaultDateRange(moment.range(startDate, endDate));
                //Pass date values to component property
                if(props.onChange) {
                    $(".searchCalendar-content").hide();
                    props.onChange(startDate, endDate);
                }
            }
        }
    //#endregion

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
}

export default SearchCalendar;