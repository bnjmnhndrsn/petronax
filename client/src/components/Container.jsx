import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import windowSize from 'react-window-size';

import { actions as uiActions } from '../reducers/ui';

import Header from './Header';
import CalendarDates from './CalendarDates';

import './styles/Container.css';

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

const mapDispatchToProps = {
    setDate: uiActions.setDate
};

const DATE_FORMAT = 'YYYY-MM-DD';

class App extends Component {
    componentDidMount(){
        this.props.setDate(
            moment().year((Math.floor((Math.random() * 215)) + 1800).toString()).format(DATE_FORMAT)
        );
    }

    render() {
        const photoWidth = Math.min(this.props.windowWidth, 500);
        if (!this.props.date) {
            return null;
        }

        return (
            <div className="app">
                <Header date={this.props.date} setDate={this.props.setDate} />
                <CalendarDates date={this.props.date} setDate={this.props.setDate} windowWidth={this.props.windowWidth} photoWidth={photoWidth} />
            </div>
        );
    }
}

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(App));
