import React, { Component } from 'react';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import queryString from 'query-string';

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

class ExplorerContainer extends Component {
    componentDidMount(){
        const query = queryString.parse(this.props.location.search);
        console.log(query);
        if (this.props.date !== query.date) {
            this.props.setDate(query.date);
        }
    }

    render() {
        const photoWidth = Math.min(this.props.windowWidth - 20, 500);
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

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(ExplorerContainer));
