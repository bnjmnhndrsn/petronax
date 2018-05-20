import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';

import { actions as uiActions } from './reducers/ui';

import DatePicker from './components/DatePicker';
import Photo from './components/Photo';

import './App.css';
import 'react-dates/lib/css/_datepicker.css';

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
            moment().year((Math.floor((Math.random() * 100)) + 1900).toString()).format(DATE_FORMAT)
        );
    }

    render() {
        return (
            <div className="app">
                <div className="header">
                    <DatePicker date={this.props.date} setDate={this.props.setDate} />
                </div>
                <Photo />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
