import React from 'react';

import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

import './styles/DatePicker.css';

export default function DatePicker ({date, setDate}) {
    return (
        <div className="date-picker">
            <MonthPicker date={date} setDate={setDate} />
            <YearPicker date={date} setDate={setDate} />
        </div>
    );
}
