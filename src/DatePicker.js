import './App.css';
import React from "react";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

function DatePicker(props){

    function onChange(e){
        props.onSelect(e.value);
    }

    function disabledDate(args){
        if (props.stockHistory.findIndex( elem => elem.date.toDateString() === args.date.toDateString()) === -1) {
            args.isDisabled = true;
        }
    }

    return(
        <DatePickerComponent 
            id="datepicker" 
            placeholder="Select date"
            onChange={e => onChange(e)}
            min={props.minDate}
            max={props.maxDate}
            renderDayCell={disabledDate}
            />
    )
}

export default DatePicker;