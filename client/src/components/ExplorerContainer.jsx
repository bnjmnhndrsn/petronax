import React, { Component } from 'react';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import queryString from 'query-string';

import { actions as uiActions } from '../reducers/ui';
import { isValidDate, randomDate } from '../utils';

import CalendarDates from './CalendarDates';

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

const mapDispatchToProps = {
    setDate: uiActions.setDate
};

class ExplorerContainer extends Component {
    componentDidMount(){
        const { date } = queryString.parse(this.props.location.search);
        let newDate;

        if (isValidDate(date) && this.props.date !== date) {
            newDate = date;
        } else {
            newDate = randomDate();
        }

        this.props.setDate(newDate);
    }

    componentDidUpdate(prevProps){
        if (this.props.date !== prevProps.date) {
            this.props.history.replace(`/explore/?date=${this.props.date}`);
        }
    };

    render() {
        const photoWidth = Math.min(this.props.windowWidth - 20, 500);
        if (!this.props.date) {
            return null;
        }

        return <CalendarDates date={this.props.date} setDate={this.props.setDate} windowWidth={this.props.windowWidth} photoWidth={photoWidth} />;
    }
}

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(ExplorerContainer));
