import React from 'react';
import moment from 'moment';

import VerticalSlider from './VerticalSlider';

import { DATE_FORMAT } from '../constants'

const OPTIONS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthPicker({setDate, date}){
    const momentDate = moment(date, DATE_FORMAT);
    const renderOption = ({index, style}) => <div key={index} style={style}>{OPTIONS[index]}</div>;
    const onIndexChange = (idx) => {
        if (momentDate.month() !== idx) {
            setDate(momentDate.month(idx).format(DATE_FORMAT));
        }
    }
    return (
        <div style={{width: '120px'}}>
            <VerticalSlider
                index={momentDate.month()}
                itemHeight={30}
                totalLength={OPTIONS.length}
                renderOption={renderOption}
                onIndexChange={onIndexChange}
            />
        </div>
    )
}
