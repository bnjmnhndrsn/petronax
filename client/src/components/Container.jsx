import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { actions as uiActions } from '../reducers/ui';

import DatePicker from './DatePicker';
import Photos from './Photos';

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
            moment().year((Math.floor((Math.random() * 100)) + 1900).toString()).format(DATE_FORMAT)
        );
    }

    render() {
        return (
            <div className="app">
                <DatePicker date={this.props.date} setDate={this.props.setDate} />
                <Photos />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);