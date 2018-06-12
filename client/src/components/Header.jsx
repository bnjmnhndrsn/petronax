import React from 'react';

import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

import './styles/Header.css';

export default function DatePicker ({date, setDate}) {
    return (
        <div className="header">
            <div className="brand header-item">
                <div className="logo">
                    <span className="prefix">The</span>
                    <span className="name">{' '}Photochronometer</span>
                </div>
            </div>
            <div className="date-picker  header-item">
                <MonthPicker date={date} setDate={setDate} />
                <YearPicker date={date} setDate={setDate} />
            </div>
        </div>
    );
}
