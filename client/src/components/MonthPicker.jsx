import React from 'react';
import moment from 'moment';

import VerticalSlider from './VerticalSlider';

import { DATE_FORMAT } from '../constants'

const OPTIONS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthPicker({setDate, date}){
    const renderOption = ({index, style}) => <div key={index} style={style}>{OPTIONS[index]}</div>;

    return (
        <div style={{width: '120px'}}>
            <VerticalSlider itemHeight={30} totalLength={OPTIONS.length} renderOption={renderOption} />
        </div>
    )
}
