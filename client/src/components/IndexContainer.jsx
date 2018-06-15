import React, { Component } from 'react';

import { randomDate } from '../utils';

export default class IndexContainer extends Component {
    componentDidMount(){
        const newLocation = randomDate();
        this.props.history.replace(`/explore/?date=${newLocation}`);
    }

    render(){
        return null;
    }
}
