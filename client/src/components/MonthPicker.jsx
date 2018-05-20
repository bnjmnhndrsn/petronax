import React from 'react';
import moment from 'moment';

import { DATE_FORMAT } from '../constants'

const OPTIONS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthPicker({setDate, date}){
    const onChange = (e) => {
        const newValue = e.target.value;
        setDate(moment(date, DATE_FORMAT).month(newValue).format(DATE_FORMAT));
    }

    const value = date ? moment(date, DATE_FORMAT).month() : '';

    return (
        <div>
            <select onChange={onChange} value={value}>
                {
                    OPTIONS.map((month, i) => <option key={i} value={i}>{ month }</option> )
                }
            </select>
        </div>
    )
}
