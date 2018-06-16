import React, { Component } from 'react';
import { connect } from 'react-redux';

import { randomDate } from '../utils';
import { actions as uiActions } from '../reducers/ui';

import DatePicker from './DatePicker';

import './styles/IndexContainer.css';

const mapStateToProps = (state) => ({
    date: state.ui.date,
});

const mapDispatchToProps = {
    setDate: uiActions.setDate
};

export class IndexContainer extends Component {
    constructor(){
        super();
        this.onExplore = this.onExplore.bind(this);
    }

    componentDidMount(){
        if (!this.props.date) {
            this.props.setDate(randomDate());
        }
    }

    onExplore(){
        this.props.history.push(`/explore/?date=${this.props.date}`);
    }

    render(){
        return (
            <div className="index">
                <div className="index__description">
                    <p>Travel across time with images from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia</a>. Choose a date to begin.</p>
                </div>

                <div className="index__actions">
                    <div className="index__actions__item">
                        <DatePicker />
                    </div>
                    <div className="index__actions__item">
                        <button className="button" onClick={this.onExplore}>Explore</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
