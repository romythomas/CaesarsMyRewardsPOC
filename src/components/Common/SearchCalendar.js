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

const updateDateValueUI = (startDate, endDate) => {
    $('.searchCalendar-wrap input:text').val(new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString());
}

const SearchCalendar = (props)  => {
    loadScript();
    const {defaultValue, calendarId} = props;
    let {minimumDate, maximumDate} = props;
    if(!minimumDate) {
        minimumDate = moment();
    }
    if(!maximumDate) {
        maximumDate = moment().add(1, 'year');
    }

    //month range calendar code
    const monthRanges = [];
    let monthRangeStartDate = minimumDate.clone();
    while (monthRangeStartDate.isBefore(maximumDate)) {
        if(monthRangeStartDate.month() === minimumDate.month()) {
            monthRanges.push(monthRangeStartDate.clone());
        } else {
            monthRanges.push(monthRangeStartDate.clone().startOf('month'));
        }
        monthRangeStartDate = monthRangeStartDate.add(1, 'month');
    }
    //date range calendar code
    let textToDisplay = "";
    let [defaultDateRange, setDefaultDateRange] = React.useState(null);
    if(!defaultDateRange && defaultValue && defaultValue.startDate && defaultValue.endDate) {
        const defaultStartDate = moment(defaultValue.startDate);
        const defaultEndDate = moment(defaultValue.endDate);
        if(defaultStartDate.isValid() && defaultEndDate.isValid()) {
            textToDisplay = new Date(defaultStartDate).toLocaleDateString() + " - " + new Date(defaultEndDate).toLocaleDateString();
            updateDateValueUI(defaultStartDate, defaultEndDate);
            defaultDateRange = moment.range(defaultStartDate, defaultEndDate);
        }
    }
    const onDateChnage = (dateRange) => {
        if(dateRange && dateRange.start&& dateRange.start._d && dateRange.end && dateRange.end._d) {
            const startDate = dateRange.start._d;
            const endDate = dateRange.end.endOf('day')._d;
            textToDisplay = new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString();
            updateDateValueUI(startDate, endDate);
            setDefaultDateRange(moment.range(startDate, endDate));
            if(props.onChange) {
                $(".searchCalendar-content").hide();
                props.onChange(startDate, endDate);
            }
        }
    }
    const onMonthChange = (event) => {
        if(event && event.target && event.target.dataset && event.target.dataset.value) {
            const startDate = moment(event.target.dataset.value);
            const endDate = startDate.clone().endOf('month');
            textToDisplay = event.target.innerText;
            $('.searchCalendar-wrap input:text').val(textToDisplay);
            if(props.onChange) {
                $(".searchCalendar-content").hide();
                props.onChange(startDate._d, endDate._d);
              }
        }
    }
    return (
        <div className="searchCalendar">
            <div className="select-wrap searchCalendar-wrap">
                <input
                    className="form-control txt"
                    type="text"
                    id={calendarId}
                    defaultValue={textToDisplay}
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