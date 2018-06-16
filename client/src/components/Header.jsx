import React from 'react';
import { Route } from 'react-router-dom';

import './styles/Header.css';

import DatePicker from './DatePicker';

export default function Header () {
    return (
        <div className="header">
            <div className="brand header-item">
                <div className="logo">
                    <span className="prefix">The</span>
                    <span className="name">{' '}Photochronometer</span>
                </div>
            </div>
            <Route path="/explore" render={() => <div className="header-item"><DatePicker /></div>} />
        </div>
    );
}
