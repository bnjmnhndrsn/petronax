import React, { Component } from 'react';
import moment from 'moment';

import { DATE_FORMAT } from '../constants';

export default class IndexContainer extends Component {
    componentDidMount(){
        const newLocation = moment().subtract(Math.floor(Math.random() * 200), 'years').format(DATE_FORMAT);
        this.props.history.replace(`/explore/?date=${newLocation}`);
    }

    render(){
        return null;
    }
}
