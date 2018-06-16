import React from 'react';
import { connect } from 'react-redux';

import { actions as uiActions } from '../reducers/ui';
import MonthPicker from './MonthPicker';
import YearPicker from './YearPicker';

import './styles/DatePicker.css';

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

const mapDispatchToProps = {
    setDate: uiActions.setDate
};

export function DatePicker ({date, setDate}) {
    if (!date) {
        return null;
    }

    return (
        <div className="date-picker">
            <MonthPicker date={date} setDate={setDate} />
            <YearPicker date={date} setDate={setDate} />
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
