import React from 'react';

import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

import './styles/Header.css';

export default function DatePicker ({date, setDate}) {
    return (
        <div className="header">
            <div className="brand header-item">
                <span>The Photochronometer</span>
            </div>
            <div className="date-picker  header-item">
                <MonthPicker date={date} setDate={setDate} />
                <YearPicker date={date} setDate={setDate} />
            </div>
        </div>
    );
}
