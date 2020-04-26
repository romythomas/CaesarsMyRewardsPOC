import React from 'react';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

const RangeCalendar = (props)  => {
    const {defaultValue, width} = props;
    let startDt = new Date();
    let endDt = new Date().setDate(startDt.getDate() + 30);

    if(defaultValue) {
        const {startDate, endDate} = defaultValue;
        if(startDate && startDate.toString() !== "Invalid Date" && endDate && endDate.toString() !== "Invalid Date") {
            startDt = startDate;
            endDt = endDate;
        }
    }

    const onDateChange = (startDate, endDate) =>{
        if(props.onChange) {
            props.onChange(startDate, endDate);
        }
    }

    return(
        <div style={{width: width ? width : "100%"}}>
        <RangeDatePicker
            startDate={startDt}
            endDate={endDt}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2100, 0, 1)}
            onChange={(startDate, endDate) => onDateChange(startDate,endDate)}
            dateFormat="MM/DD/YYYY"
            monthFormat="MMM YYYY"
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
            disabled={false}
            className="my-own-class-name"
            startWeekDay="monday"
        />
        </div>
    );
}

export default RangeCalendar;