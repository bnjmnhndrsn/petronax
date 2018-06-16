import React from 'react';
import { Route, Link } from 'react-router-dom';

import './styles/Header.css';

import DatePicker from './DatePicker';

export default function Header () {
    return (
        <div className="header">
            <div className="brand header-item">
                <Link to="/">
                    <div className="logo">
                        <span className="prefix">The</span>
                        <span className="name">{' '}Photochronometer</span>
                    </div>
                </Link>
            </div>
            <Route path="/explore" render={() => <div className="header-item"><DatePicker /></div>} />
        </div>
    );
}
